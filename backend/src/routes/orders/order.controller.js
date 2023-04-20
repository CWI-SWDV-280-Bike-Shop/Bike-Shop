import Order from './order.model.js';
import { BaseController } from '../base.controller.js';

class OrderController extends BaseController(Order) {
  static async find({
    customer,
    itemId,
    itemType,
    itemCategory,
    bikeColor,
    bikeSize,
    bikeGender,
    serviceDate,
  } = {}) {
    let query = {};

    if (customer) query.customer = customer;
    if (itemId) query['items.product'] = itemId;
    if (itemType) query['items.productModel'] = itemType;

    const orders = await Order.find(query).populate('customer').populate({
      path: 'items',
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

    return filteredOrders;
  }
}

export default OrderController;
