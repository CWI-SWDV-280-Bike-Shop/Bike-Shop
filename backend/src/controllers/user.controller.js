import User from '../models/user.model.js';
import { BaseController } from './base.controller.js';
import { NotFound } from '../errors.js';

class UserController extends BaseController(User) {
  async getUsers(req, res) {
    let { name, email, role } = req.query;

    const users = await User.find({
      name: name,
      email: email,
      role: role,
    }).populate('orders');

    res.status(200).json(users);
  }

  async getUserById(req, res) {
    const user = await User.findById(req.params.id).populate('orders');
    if (!user) throw new NotFound();
    res.status(200).json(user);
  }
}

export default UserController;
