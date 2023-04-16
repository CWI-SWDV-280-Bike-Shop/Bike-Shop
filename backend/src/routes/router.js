import express from 'express';
import UserRoute from './users/user.route.js';
import BikeRoute from './api/bike.route.js';
import AccessoryRoute from './accessories/accessory.route.js';
import ServiceRoute from './services/service.route.js';
import OrderRoute from './api/order.route.js';
import EndpointsRoute from './endpoints/endpoints.route.js';
import AuthRoute from './api/auth.route.js';

const router = express.Router();

router.use('/', EndpointsRoute);

router.use('/auth', AuthRoute);

router.use('/users', UserRoute);

router.use('/bikes', BikeRoute);

router.use('/accessories', AccessoryRoute);

router.use('/services', ServiceRoute);

router.use('/orders', OrderRoute);

export default router;
