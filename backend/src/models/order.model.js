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
        category: String,
        price: Number,
        serviceDate: Date,
      },
    ],
    total: Number,
  },
  { timestamps: true }
);

const OrderModel = mongoose.model('Order', OrderSchema);
export default OrderModel;
