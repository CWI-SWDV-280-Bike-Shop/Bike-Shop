import Service from '../../routes/services/service.model.js';
import { ProductController } from '../product.controller.js';

class ServiceController extends ProductController(Service) {}

export default ServiceController;
