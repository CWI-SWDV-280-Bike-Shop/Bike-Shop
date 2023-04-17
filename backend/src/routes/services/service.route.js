import express from 'express';
import ServiceController from './service.controller.js';

const router = express.Router();

router.get('/', ServiceController.find);

router.get('/:id', ServiceController.getById);

router.post('/', ServiceController.create);

router.put('/:id', ServiceController.update);

router.delete('/:id', ServiceController.delete);

export default router;
