import AuthController from './auth.controller.js';
import { baseRouter } from '../base.route.js';

export default baseRouter([
  ['post', '/register', AuthController.register],
  ['post', '/login', AuthController.login],
  ['post', '/refresh', AuthController.refreshToken]
]);
