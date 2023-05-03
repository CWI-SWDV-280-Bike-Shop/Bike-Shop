import express from 'express';
import UserRoute from './users/user.route.js';
import ProductRoute from './products/product.route.js';
import ProductLabelsRoute from './productlabels/productlabels.route.js';
import OrderRoute from './orders/order.route.js';
import EndpointsRoute from './endpoints/endpoints.route.js';
import AuthRoute from './auth/auth.route.js';
import GenerateUsersRoute from './generateusers/generateUsers.route.js';
import ImageRoute from './images/image.route.js';

const router = express.Router();

router.use('/', EndpointsRoute);

router.use('/generateusers', GenerateUsersRoute);

router.use('/auth', AuthRoute);

router.use('/users', UserRoute);

router.use('/products', ProductRoute);

router.use('/productlabels', ProductLabelsRoute);

router.use('/orders', OrderRoute);

router.use('/images', ImageRoute);

export default router;
