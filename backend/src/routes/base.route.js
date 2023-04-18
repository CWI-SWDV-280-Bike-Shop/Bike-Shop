import express from 'express';

export const baseRouter = (routeOptions) => {
  const router = new express.Router();

  routeOptions.forEach((route) => {
    const [method, path, handler, options] = route;
    router[method](path, ...options?.middleware ?? [], async (req, res) =>
      res.status(200).json(await handler({ ...req.param, ...req.body, ...req.query }))
    );
  });

  return router;
}

export const baseCRUD = (controller) => baseRouter([['get', '/', controller.find], ['get', '/:id', controller.getById], ['post', '/', controller.create], ['put', '/:id', controller.update], ['delete', '/:id', controller.delete]]);
