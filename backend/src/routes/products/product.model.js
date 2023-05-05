import { mongoose } from '../../mongoose.js';
const Schema = mongoose.Schema;

const ImageSchema = new Schema(
  {
    id: String,
  },
  { _id: false }
);

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
        'Tubes',
        'Tune',
        'Wheel and Tire Maintenance',
        'Assembly',
        'Shifting and Brakes',
      ],
    },
    price: Number,
    images: [ImageSchema],
    inStock: Boolean,
    brand: String,
    material: {
      type: String,
      enum: ['Aluminum', 'Steel', 'Carbon', null, ''],
    },
    wheelSize: {
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
        '650b',
        null,
        '',
      ],
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
        null,
        '',
      ],
    },
    size: {
      type: String,
      enum: ['Small', 'Medium', 'Large', null, ''],
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model('Product', ProductSchema);
export { ProductSchema as ProductSchema };
export default ProductModel;
