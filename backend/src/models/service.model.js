import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ServiceSchema = new Schema(
  {
    name: String,
    description: String,
    category: {
      type: String,
      enum: ['Tune', 'Repair', 'Tube Installation', 'Alignment'],
    },
    price: Number,
    serviceDate: Date,
    inStock: Boolean,
  },
  { timestamps: true }
);

const ServiceModel = mongoose.model('Service', ServiceSchema);
export default _Model;
