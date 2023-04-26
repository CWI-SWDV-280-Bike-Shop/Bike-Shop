import jwt from 'jsonwebtoken';
import config from '../config/auth.config.js';
import User from '../models/user.model.js';
import { Forbidden, Unauthorized } from '../errors.js';
import { AccessTokenExpired } from '../errors/errors.js';

const { TokenExpiredError } = jwt;

const authToken = {
  verifyToken(req, res, next) {
    let token = req.headers['x-access-token'];

    if (!token) throw new Unauthorized('No token provided!');

    jwt.verify(token, config.secret, async (error, decoded) => {
      if (error instanceof TokenExpiredError) throw new AccessTokenExpired('Access token was expired!');

      const user = User.findById(decoded.userId);
      if (!user) throw new Forbidden('User not found');

      req.user = user;
      next();
    });
  },
};

export default authToken;
