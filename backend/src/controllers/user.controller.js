import User from '../models/user.model.js';
import { NotFound } from '../errors.js';

const UserController = {
  async getUsers(req, res) {
    let { name, email, role } = req.query;

    const users = await User.find({
      name: name,
      email: email,
      role: role,
    }).populate('orders');

    res.status(200).json(users);
  },

  async getUserById(req, res) {
    console.log('Getting User by ID');
    const user = await User.findById(req.params.id).populate('orders');
    if (!user) throw new NotFound('User not found');
    res.status(200).json(user);
  },

  async createUser(req, res) {
    console.log('Creating User');
    const user = new User(req.body);
    const newUser = await user.save();
    res.status(200).json(newUser);
  },

  async updateUser(req, res) {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) throw new NotFound('User not found');
    res.status(200).json(user);
  },

  async deleteUser(req, res) {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) throw new NotFound('User not found');
    res.status(200).json({ message: 'User deleted successfully' });
  },
};

export default UserController;
