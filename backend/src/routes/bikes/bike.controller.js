import Bike from '../../routes/bikes/bike.model.js';
import { ProductController } from '../product.controller.js';

class BikeController extends ProductController(Bike) {}

export default BikeController;
