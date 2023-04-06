import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
    role: {
      type: String,
      enum: ['Admin', 'Customer'],
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
