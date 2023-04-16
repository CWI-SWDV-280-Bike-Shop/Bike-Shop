import express from 'express';
import OrderController from './order.controller.js';

const router = express.Router();

router.get('/', OrderController.find);

router.get('/:id', OrderController.getById);

router.post('/', OrderController.create);

router.put('/:id', OrderController.update);

router.delete('/:id', OrderController.delete);

export default router;
