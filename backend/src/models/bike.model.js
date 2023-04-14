import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const BikeSchema = new Schema(
  {
    brand: String,
    name: String,
    description: String,
    category: {
      type: String,
      enum: ['Mountain', 'Electric', 'Street'],
    },
    material: {
      type: String,
      enum: [
        'Aluminum',
        'Steel',
        'Carbon'
      ]
    },
    wheelSize:{
      type: String,
      trim: true,
      lowercase: true,
      enum: [
        '20in',
        '24in',
        '26in',
        '27.5in',
        '29in',
        '700c',
        '650b'
      ]
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
        'Pink',
      ],
    },
    size: {
      type: String,
      enum: ['Small', 'Medium', 'Large'],
    },
    gender: String,
    price: Number,
    image: String,
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const BikeModel = mongoose.model('Bike', BikeSchema);
export default BikeModel;
