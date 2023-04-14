import jwt from 'jsonwebtoken';
import config from '../config/auth.config.js';
import User from '../models/user.model.js';

const { TokenExpiredError } = jwt;

const authToken = {
  verifyToken(req, res, next) {
    let token = req.headers['x-access-token'];

    if (!token) {
      return res.status(401).json({ message: 'No token provided!' });
    }

    jwt.verify(token, config.secret, async (error, decoded) => {
      if (error instanceof TokenExpiredError) {
        return res
          .status(401)
          .json({ message: 'Unauthorized! Access token was expired!' });
      }

      const user = User.findById(decoded.userId);
      if (!user) {
        res.status(403).json({ message: 'User not found' });
        return;
      }

      req.user = user;
      next();
    });
  },
};

export default authToken;
