import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: String,
    description: String,
    productType: {
      type: String,
      enum: ['Bike', 'Accessory', 'Service'],
    },
    bikeType: {
      type: String,
      enum: ['Mountain', 'Electric', 'Street'],
    },
    accessoryType: {
      type: String,
      enum: [
        'Tires',
        'Brakes',
        'Lights',
        'Frames',
        'Chains',
        'Pedals',
        'Tires',
        'Tubes',
      ],
    },
    serviceType: {
      type: String,
      enum: ['Tune', 'Repair', 'Tube Installation', 'Alignment'],
    },
    color: String,
    size: String,
    gender: String,
    price: Number,
    inStock: Boolean,
  },
  { timestamps: true }
);

const ProductModel = mongoose.model('Product', ProductSchema);
export default ProductModel;
 