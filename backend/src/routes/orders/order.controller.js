import Order from './order.model.js';
import Product from '../products/product.model.js';
import { BaseController } from '../base.controller.js';
import { UserError } from '../../errors/errors.js';

async function safeOrder(data) {
  const safeItems = await Promise.all(
    data.items?.map(async (userItem) => {
      const referencedProduct = await Product.findById(userItem.product);
      if (!referencedProduct)
        throw new UserError(`Nonexistent product: ${referencedProduct}`);
      return {
        ...userItem,
        price: referencedProduct.price,
        product: referencedProduct,
      };
    })
  );
  return {
    ...data,
    items: safeItems,
    total: safeItems.reduce((sum, item) => {
      return (sum += item.price * (item.quantity ?? 1));
    }, 0),
  };
}

class OrderController extends BaseController(Order) {
  static auth = {
    ...super.auth,
    isOwnedByUser: (order, user) => order.customer?._id?.toString() === user._id?.toString()
  };

  static async find(query = {}) {
    return {
      type: 'read',
      data: await Order.find({
        ...query,
        items: {
          $elemMatch: query.items ?? {}
        }
      })
    };
  }

  static async getById({ id } = {}) {
    return {
      type: 'read',
      data: await Order.findById(id)
    }
  }

    static async create(data) {
      return super.create(await safeOrder(data));
    }
  
    static async update(data) {
      return super.update(await safeOrder(data));
    }
}

export default OrderController;
