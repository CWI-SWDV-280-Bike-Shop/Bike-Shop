import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ServiceSchema = new Schema(
  {
    name: String,
    description: String,
    category: {
      type: String,
      enum: ['Tune', 'Wheel and Tire Maintenance', 'Assembly', 'Shifting and Brakes'],
    },
    price: Number,
    images: [String],
    inStock: Boolean,
  },
  { timestamps: true }
);

const ServiceModel = mongoose.model('Service', ServiceSchema);
export default ServiceModel;
