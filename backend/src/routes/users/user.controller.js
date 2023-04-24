import User from '../../routes/users/user.model.js';
import { BaseController } from '../base.controller.js';
import { NotFound } from '../../errors/errors.js';

class UserController extends BaseController(User) {
  static find(query) {
    return User.find(query).populate({
      path: 'orders',
      populate: 'items.product',
    });
  }

  static async getById({ id } = {}) {
    const user = await User.findById(id).populate({
      path: 'orders',
      populate: 'items.product',
    });
    if (!user) throw new NotFound();
    return user;
  }
}

export default UserController;
