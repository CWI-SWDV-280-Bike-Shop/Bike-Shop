import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const BikeSchema = new Schema(
  {
    name: String,
    description: String,
    category: {
      type: String,
      enum: ['Mountain', 'Electric', 'Street'],
    },
    price: Number,
    inStock: Boolean,
  },
  { timestamps: true }
);

const BikeModel = mongoose.model('Bike', BikeSchema);
export default BikeModel;
