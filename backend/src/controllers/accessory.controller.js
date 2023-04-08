import Accessory from '../models/accessory.model.js';
import { NotFound } from '../errors.js';

const AccessoryController = {
  async getAccessories(req, res) {
    const accessories = await Accessory.find();
    res.status(200).json(accessories);
  },

  async getAccessoryById(req, res) {
    const accessory = await Accessory.findById(req.params.id);
    if (!accessory) throw new NotFound('Accessory not found');
    res.status(200).json(accessory);
  },

  async createAccessory(req, res) {
    const accessory = new Accessory(req.body);
    const newAccessory = await accessory.save();
    res.status(200).json(newAccessory);
  },

  async updateAccessory(req, res) {
    const accessory = await Accessory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!accessory) throw new NotFound('Accessory not found');
    res.status(200).json(accessory);
  },

  async deleteAccessory(req, res) {
    const accessory = await Accessory.findByIdAndDelete(req.params.id);
    if (!accessory) throw new NotFound('Accessory not found');
    res.status(200).json({ message: 'Accessory deleted successfully' });
  },
};

export default AccessoryController;
