import Bike from '../models/bike.model.js';
import { NotFound } from '../errors.js';

const BikeController = {
  async getBikes(req, res) {
    const bikes = await Bike.find();
    res.status(200).json(bikes);
  },

  async getBikeById(req, res) {
    const bike = await Bike.findById(req.params.id);
    if (!bike) throw new NotFound('Bike not found');
    res.status(200).json(bike);
  },

  async createBike(req, res) {
    const bike = new Bike(req.body);
    const newBike = await bike.save();
    res.status(200).json(newBike);
  },

  async updateBike(req, res) {
    const bike = await Bike.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!bike) throw new NotFound('Bike not found');
    res.status(200).json(bike);
  },

  async deleteBike(req, res) {
    const bike = await Bike.findByIdAndDelete(req.params.id);
    if (!bike) throw new NotFound('Bike not found');
    res.status(200).json({ message: 'Bike deleted successfully' });
  },
};

export default BikeController;
