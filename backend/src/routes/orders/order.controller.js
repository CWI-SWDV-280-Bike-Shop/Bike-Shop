import Order from './order.model.js';
import { BaseController } from '../base.controller.js';

class OrderController extends BaseController(Order) {
  static find(query = {}) {
    return Order.find({
      ...query,
      items: {
        $elemMatch: query.items ?? {}
      }
    })
      .populate('customer')
      .populate('items')
      .populate('items.product');
  }

  static getById(query = {}) {
    return Order.findById(query)
      .populate('customer')
      .populate('items')
      .populate('items.product');
  }
}

export default OrderController;
