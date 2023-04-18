import User from '../../routes/users/user.model.js';
import { BaseController } from '../base.controller.js';
import { NotFound } from '../../errors/errors.js';

class UserController extends BaseController(User) {
  getUsers(query) {
    return User.find(query).populate('orders');
  }

  async getUserById({ id } = {}) {
    const user = await User.findById(id).populate('orders');
    if (!user) throw new NotFound();
    return user;
  }
}

export default UserController;
