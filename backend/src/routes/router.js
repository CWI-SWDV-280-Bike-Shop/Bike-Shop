import express from 'express';
import UserRoute from './api/user.route.js';
import ProductRoute from './api/product.route.js';
import OrderRoute from './api/order.route.js';
import EndpointsRoute from './api/endpoints.route.js';

const router = express.Router();

router.use('/', EndpointsRoute)

router.use('/users', UserRoute);

router.use('/products', ProductRoute);

router.use('/orders', OrderRoute);

export default router;
