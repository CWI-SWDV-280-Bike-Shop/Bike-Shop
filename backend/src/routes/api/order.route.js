import express from 'express';
import OrderController from '../../controllers/order.controller.js';

const router = express.Router();

router.get('/', OrderController.getOrders);

router.get('/:id', OrderController.getOrderById);

router.post('/', OrderController.createOrder);

router.put('/:id', OrderController.updateOrder);

router.delete('/:id', OrderController.deleteOrder);

export default router;
