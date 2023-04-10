import Service from '../models/service.model.js';
import { NotFound } from '../errors.js';

const ServiceController = {
  async getServices(req, res) {
    let { name, category, inStock, serviceDate } = req.query;

    const services = await Service.find({
      name: name,
      category: category,
      inStock: inStock,
      serviceDate: serviceDate,
    });
    res.status(200).json(services);
  },

  async getServiceById(req, res) {
    const service = await Service.findById(req.params.id);
    if (!service) throw new NotFound('Service not found');
    res.status(200).json(service);
  },

  async createService(req, res) {
    const service = new Service(req.body);
    const newService = await service.save();
    res.status(200).json(newService);
  },

  async updateService(req, res) {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!service) throw new NotFound('Service not found');
    res.status(200).json(service);
  },

  async deleteService(req, res) {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) throw new NotFound('Service not found');
    res.status(200).json({ message: 'Service deleted successfully' });
  },
};

export default ServiceController;
