import AuthController from './auth.controller.js';
import { baseRouter } from '../base.route.js';

export default baseRouter(AuthController, [
  ['post', '/register', 'register'],
  ['post', '/login', 'login'],
  ['post', '/refresh', 'refreshToken']
]);
