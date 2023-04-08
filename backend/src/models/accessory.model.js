import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const AccessorySchema = new Schema(
  {
    name: String,
    description: String,
    category: {
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
    price: Number,
    inStock: Boolean,
  },
  { timestamps: true }
);

const AccessoryModel = mongoose.model('Accessory', AccessorySchema);
export default AccessoryModel;
