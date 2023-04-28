import express from 'express';

export const baseRouter = (routeOptions) => {
  const router = new express.Router();

  routeOptions.forEach((route) => {
    const [method, path, handler, options] = route;
    router[method](
      path,
      ...(options?.middleware ?? []),
      Object.defineProperty(
        async (req, res) =>
          res
            .status(200)
            .json(await handler(
              { ...req.params, ...req.body, ...req.query, files: req.files },
              { appBaseURL: new URL(`${req.protocol}://${req.host}`).href })
            ),
        "name",
        { value: handler.name }
      )
    );
  });

  return router;
}

export const baseCRUD = (controller, options) => baseRouter([['get', '/', controller.find], ['get', '/:id', controller.getById], ['post', '/', controller.create], ['put', '/:id', controller.update], ['delete', '/:id', controller.delete]].map((route) => [...route, options]));
