import Order from '../models/order.model.js';

const OrderController = {
  async getOrders(req, res) {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getOrderById(req, res) {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async createOrder(req, res) {
    try {
      const order = new Order(req.body);
      const newOrder = await order.save();
      res.status(200).json(newOrder);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async updateOrder(req, res) {
    try {
      const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteOrder(req, res) {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

export default OrderController;
