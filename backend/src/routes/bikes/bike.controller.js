import Bike from '../../routes/bikes/bike.model.js';
import { BaseController } from '../base.controller.js';

class BikeController extends BaseController(Bike) {}

export default BikeController;
