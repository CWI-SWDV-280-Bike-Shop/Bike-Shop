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
    /*we are going to move this serviceDate somewhere else, leaving this here so it can be looked at for reference
    const serviceDay = new Date(req.body.serviceDate);
    const service = new Service({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price,
    serviceDate: serviceDay,
    inStock: req.body.inStock
   })
   */
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
