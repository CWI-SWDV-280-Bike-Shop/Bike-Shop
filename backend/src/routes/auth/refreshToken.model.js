import { mongoose } from '../../mongoose.js';
import config from '../../config/auth.config.js';
import { v4 as uuidv4 } from 'uuid';
const Schema = mongoose.Schema;

const RefreshTokenSchema = new Schema({
  token: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true,
  },
  expiryDate: Date,
});

RefreshTokenSchema.statics.createToken = async function (user) {
  let expiredAt = new Date();
  expiredAt.setSeconds(expiredAt.getSeconds() + config.refreshTokenExpiration);

  let _token = uuidv4();

  let _object = new this({
    token: _token,
    user: user._id,
    expiryDate: expiredAt.getTime(),
  });

  let refreshToken = await _object.save();
  return refreshToken.token;
};

RefreshTokenSchema.statics.verifyExpiration = (token) => {
  return token.expiryDate.getTime() < new Date().getTime();
};

const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema);
export default RefreshToken;
