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
    color: {
      type: String,
      enum: [
        'Red',
        'Orange',
        'Yellow',
        'Green',
        'Blue',
        'Purple',
        'Black',
        'White',
        'Grey',
      ],
    },
    size: {
      type: String,
      enum: ['Small', 'Medium', 'Large'],
    },
    gender: String,
    price: Number,
    inStock: Boolean,
  },
  { timestamps: true }
);

const BikeModel = mongoose.model('Bike', BikeSchema);
export default BikeModel;
