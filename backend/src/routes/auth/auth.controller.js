import { mongoose } from '../../mongoose.js';
import jwt from 'jsonwebtoken';
import User from '../users/user.model.js';
import RefreshToken from '../../routes/auth/refreshToken.model.js';
import config from '../../config/auth.config.js';
import {
  hashPassword,
  validatePassword,
} from '../../utilities/password.utility.js';
import { Conflict, Unauthorized } from '../../errors/errors.js';

const AuthController = {
  async register({ name, email, password, phone, address, role }) {
    const hashedPassword = await hashPassword(password);

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      email: email,
      password: hashedPassword,
      phone,
      address,
      role,
    });

    // check if user w/ email already exists before creating new User
    const checkEmail = await User.findOne({ email });
    if (checkEmail) throw new Conflict('A user already exists with that email');

    await user.save();
    return user;
  },

  async login({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) throw new Unauthorized('Email does not exist!');

    const validPassword = await validatePassword(password, user.password);
    if (!validPassword) throw new Unauthorized('Password is incorrect!');

    const accessToken = jwt.sign({ userId: user.id }, config.secret, {
      expiresIn: config.accessTokenExpiration,
    });
    let refreshToken = await RefreshToken.createToken(user); // returns refreshToken.token

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  },

  async refreshToken({ refreshToken: requestToken }) {
    if (!requestToken) throw new Unauthorized('Refresh token is required!');

    let refreshToken = await RefreshToken.findOne({ token: requestToken });
    if (!refreshToken)
      throw new Unauthorized('Refresh token is not in the database!');

    // check if refreshToken has expired
    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.findByIdAndRemove(refreshToken._id, {
        useFindAndModify: false,
      });

      throw new Unauthorized(
        'Refresh token was expired! Please make a new login request'
      );
    }

    // refreshToke was not expired, we can issue a new accessToken
    let newAccessToken = jwt.sign(
      { userId: refreshToken.user._id },
      config.secret,
      {
        expiresIn: config.accessTokenExpiration,
      }
    );

    return {
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    };
  },
};

export default AuthController;
