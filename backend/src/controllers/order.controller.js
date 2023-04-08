import Order from '../models/order.model.js';
import { NotFound } from '../errors.js';

const OrderController = {
  async getOrders(req, res) {
    const orders = await Order.find();
    res.status(200).json(orders);
  },

  async getOrderById(req, res) {
    const order = await Order.findById(req.params.id);
    if (!order) throw new NotFound('Order not found');
    res.status(200).json(order);
  },

  async createOrder(req, res) {
    const order = new Order(req.body);
    const newOrder = await order.save();
    res.status(200).json(newOrder);
  },

  async updateOrder(req, res) {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!order) throw new NotFound('Order not found');
    res.status(200).json(order);
  },

  async deleteOrder(req, res) {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) throw new NotFound('Order not found');
    res.status(200).json({ message: 'Order deleted successfully' });
  },
};

export default OrderController;
