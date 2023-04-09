import express from 'express';
import EndpointsController from '../../controllers/endpoints.controller.js';

const router = express.Router();

router.get('/', EndpointsController.getEndpoints);

export default router;
