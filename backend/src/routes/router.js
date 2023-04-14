import express from 'express';
import UserRoute from './users/user.route.js';
import BikeRoute from './bikes/bike.route.js';
import AccessoryRoute from './accessories/accessory.route.js';
import ServiceRoute from './services/service.route.js';
import OrderRoute from './orders/order.route.js';
import EndpointsRoute from './endpoints/endpoints.route.js';
import AuthRoute from './auth/auth.route.js';
import GenerateUsersRoute from './generateusers/generateUsers.route.js';

const router = express.Router();

router.use('/', EndpointsRoute);

router.use('/generateusers', GenerateUsersRoute);

router.use('/auth', AuthRoute);

router.use('/users', UserRoute);

router.use('/bikes', BikeRoute);

router.use('/accessories', AccessoryRoute);

router.use('/services', ServiceRoute);

router.use('/orders', OrderRoute);

export default router;
