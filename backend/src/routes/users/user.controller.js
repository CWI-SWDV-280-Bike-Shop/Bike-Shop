import User from '../../routes/users/user.model.js';
import { BaseController } from '../base.controller.js';
import { NotFound } from '../../errors/errors.js';

class UserController extends BaseController(User) {
  static auth = {
    ...this.auth,
    isOwnedByUser: (a, b) => a._id === b._id
  }

  static async find(query) {
    return {
      type: 'read',
      data: await User.find(query),
    }
  }

  static async getById({ id } = {}) {
    const user = await User.findById(id);
    if (!user) throw new NotFound();
    return {
      type: 'read',
      data: user,
    };
  }
}

export default UserController;
