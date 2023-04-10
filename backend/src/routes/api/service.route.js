import express from 'express';
import ServiceController from '../../controllers/service.controller.js';

const router = express.Router();

router.get('/', ServiceController.getServices);

router.get('/:id', ServiceController.getServiceById);

router.post('/', ServiceController.createService);

router.put('/:id', ServiceController.updateService);

router.delete('/:id', ServiceController.deleteService);

export default router;
