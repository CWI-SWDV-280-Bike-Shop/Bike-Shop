import Order from '../models/order.model.js';
import { NotFound } from '../errors.js';

const OrderController = {
  async getOrders(req, res) {
    let {
      customer,
      itemId,
      itemType,
      itemCategory,
      bikeColor,
      bikeSize,
      bikeGender,
      serviceDate,
    } = req.query;

    let query = {};

    if (customer) query.customer = customer;
    if (itemId) query['items.item'] = itemId;
    if (itemType) query['items.itemModel'] = itemType;

    // Example of the query if all params are present
    // query = {
    //   'customer': customer,
    //   'items.item': itemId,
    //   'items.itemModel': itemType,
    // };

    const orders = await Order.find(query).populate('customer').populate({
      path: 'items.item',
      model: itemType,
    });

    // After retrieving the orders, filter them based on the contents of their "items"
    let filteredOrders = orders;

    // this is a little ugly and could probably be cleaned up, but it provides the functionality
    // that i think we're looking for
    if (itemCategory || bikeColor || bikeSize || bikeGender || serviceDate) {
      filteredOrders = orders.filter((order) => {
        return order.items.some((item) => {
          return (
            (!itemCategory || item.item.category === itemCategory) &&
            (!bikeColor || item.item.color === bikeColor) &&
            (!bikeSize || item.item.size === bikeSize) &&
            (!bikeGender || item.item.gender === bikeGender)
          );
        });
      });
    }

    res.status(200).json(filteredOrders);
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
