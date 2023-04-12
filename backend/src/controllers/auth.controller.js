import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import RefreshToken from '../models/refreshToken.model.js';
import config from '../config/auth.config.js';
import {
  hashPassword,
  validatePassword,
} from '../utilities/password.utility.js';

const AuthController = {
  async register(req, res) {
    const { name, email, password } = req.body;
    const hashedPassword = await hashPassword(password);

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      email: email,
      password: hashedPassword,
    });

    const accessToken = jwt.sign({ userId: user }, config.secret, {
      expiresIn: config.accessTokenExpiration,
    });
    let refreshToken = await RefreshToken.createToken(user);

    // check if user w/ email already exists before creating new User
    const checkEmail = await User.findOne({ email });
    if (checkEmail)
      return res.json({ message: 'A user already exists with that email' });

    await user.save();
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  },

  async login(req, res, next) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json({ message: 'Email does not exist!' });

    const validPassword = await validatePassword(password, user.password);
    if (!validPassword) return res.json({ message: 'Password is incorrect!' });

    const accessToken = jwt.sign({ userId: user.id }, config.secret, {
      expiresIn: config.accessTokenExpiration,
    });
    let refreshToken = await RefreshToken.createToken(user); // returns refreshToken.token

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  },

  async refreshToken(req, res) {
    const { refreshToken: requestToken } = req.body;
    if (!requestToken) {
      return res.status(403).json({ message: 'Refresh token is required!' });
    }

    let refreshToken = await RefreshToken.findOne({ token: requestToken });
    if (!refreshToken) {
      return res
        .status(403)
        .json({ message: 'Refresh token is not in the database!' });
    }

    // check if refreshToken has expired
    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.findByIdAndRemove(refreshToken._id, {
        useFindAndModify: false,
      });

      return res.status(403).json({
        message: 'Refresh token was expired! Please make a new login request',
      });
    }

    // refreshToke was not expired, we can issue a new accessToken
    let newAccessToken = jwt.sign(
      { userId: refreshToken.user._id },
      config.secret,
      {
        expiresIn: config.accessTokenExpiration,
      }
    );

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  },
};

export default AuthController;
