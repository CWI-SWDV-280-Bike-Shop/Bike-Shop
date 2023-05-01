import express from 'express';
import { addPermissions } from '../middleware/auth.middleware.js';
import { authContext } from '../middleware/auth.middleware.js';
import { NotFound, Forbidden, InternalError, AccessTokenExpired } from '../errors/errors.js';

export const baseRouter = (controller, routeOptions) => {
  const router = new express.Router();

  routeOptions.forEach((route) => {
    const [method, path, methodName, options] = route;
    router[method](
      path,
      addPermissions,
      ...(options?.middleware ?? []),
      Object.defineProperty(
        async (req, res) => {
              const action = await controller[methodName]({ ...req.params, ...req.body, ...req.query, files: req.files },{ appBaseURL: new URL(`${req.protocol}://${req.host}`).href } );

          if (action.type !== 'unauthed') {
            const context = authContext.getStore();

            if (!context) throw new InternalError('No authContext store!')
            const { user, rolePermissions } = context;
            if (!rolePermissions) throw new InternalError('Role permissions not defined in authContext!');
            const grant = rolePermissions.collections[controller.modelName]?.find((m) => m.method === action.type);
            try {
              if (!grant) throw new Forbidden();

              const checkOwnershipAndCensorKeys = async (data) => {
                const oldData = (await controller.auth.findByPrimary(data)) ?? data;
                const forbidden = grant.onlyOwn && (!user || !controller.auth.isOwnedByUser(oldData, user));
                if (forbidden && action.write) throw new Forbidden();
                if (forbidden && !action.write) return undefined;
                grant.disallowedKeys?.forEach((k) => delete data[k]);
                return data;
              }

              action.data = Array.isArray(action.data) ? (await Promise.all(action.data.map(checkOwnershipAndCensorKeys))).filter((d) => d !== undefined) : await checkOwnershipAndCensorKeys(action.data)
            } catch (error) {
              if (error instanceof Forbidden && context.accessTokenExpired) throw new AccessTokenExpired();
              throw error;
            }
          }
          res
            .status(200)
            .json(action.write ? await action.write(action.data) : action.data)
        },
        'name',
        { value: methodName }
      )
    );
  });

  return router;
}

export const baseCRUD = (controller, options) => baseRouter(controller, [['get', '/', 'find'], ['get', '/:id', 'getById'], ['post', '/', 'create'], ['put', '/:id', 'update'], ['delete', '/:id', 'delete']].map((route) => [...route, options]));
