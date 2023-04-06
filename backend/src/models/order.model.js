import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    items: [
      {
        name: String,
        description: String,
        productType: String,
        bikeType: String,
        accessoryType: String,
        serviceType: String,
        color: String,
        size: String,
        price: Number,
        serviceDate: Date,
        quantity: Number,
      },
    ],
    total: Number,
  },
  { timestamps: true }
);

const OrderModel = mongoose.model('Order', OrderSchema);
export default OrderModel;
