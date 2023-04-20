import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: String,
    description: String,
    category: {
      type: String,
      enum: ['Bikes', 'Accessories', 'Services'],
    },
    subcategory: {
      type: String,
      enum: [
        'Mountain',
        'Electric',
        'Street',
        'Tires',
        'Brakes',
        'Lights',
        'Frames',
        'Chains',
        'Pedals',
        'Tires',
        'Tubes',
        'Tune',
        'Wheel and Tire Maintenance',
        'Assembly',
        'Shifting and Brakes',
      ],
    },
    price: Number,
    imageURL: String,
    inStock: Boolean,
    material: {
      type: String,
      enum: ['Aluminum', 'Steel', 'Carbon'],
    },
    wheelSize: {
      type: String,
      trim: true,
      lowercase: true,
      enum: ['20in', '24in', '26in', '27.5in', '29in', '700c', '650b'],
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
    gender: {
      type: String,
      enum: ['Mens', 'Womens', 'Neutral'],
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model('Product', ProductSchema);
export default ProductModel;
