import Accessory from './accessory.model.js';
import { ProductController } from '../product.controller.js';

class AccessoryController extends ProductController(Accessory) {}

export default AccessoryController;
