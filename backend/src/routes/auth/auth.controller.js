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
import UserController from '../users/user.controller.js';

class AuthController extends UserController {
  static async register(data) {
    return {
      type: 'unauthed',
      data,
      write: async (data) => {
        const hashedPassword = await hashPassword(data.password);

        const user = new User({
          ...data,
          _id: new mongoose.Types.ObjectId(),
          password: hashedPassword,
          role: "customer",
        });

        // check if user w/ email already exists before creating new User
        const checkEmail = await User.findOne({ email: data.email });
        if (checkEmail) throw new Conflict('A user already exists with that email');

        await user.save();
        return user;
      }
    }
  }

  static async login({ email, password }) {
    const user = (await this.find({ email })).data[0];
    if (!user) throw new Unauthorized('Email does not exist!');

    const validPassword = await validatePassword(password, user.password);
    if (!validPassword) throw new Unauthorized('Password is incorrect!');

    const accessToken = jwt.sign({ user }, config.secret, {
      expiresIn: config.accessTokenExpiration,
    });
    let refreshToken = await RefreshToken.createToken(user); // returns refreshToken.token

    return {
      type: 'unauthed',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        accessToken: accessToken,
        refreshToken: refreshToken,
      }
    };
  }

  static async refreshToken({ refreshToken: requestToken }) {
    if (!requestToken) throw new Unauthorized('Refresh token is required!');
    let refreshToken = await RefreshToken.findOne({
      token: requestToken,
    }).populate("user");
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
      { user: refreshToken.user },
      config.secret,
      {
        expiresIn: config.accessTokenExpiration,
      }
    );

    return {
      type: 'unauthed',
      data: {
        accessToken: newAccessToken,
        refreshToken: refreshToken.token,
      }
    };
  }
}

export default AuthController;
