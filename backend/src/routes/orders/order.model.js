import mongoose from 'mongoose';
import { AddressSchema } from '../../schemas/address.schema.js';
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    autopopulate: true,
  },
  price: Number,
  quantity: Number,
});

const OrderSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: { maxDepth: 1 },
    },
    items: [ItemSchema],
    shippingAddress: AddressSchema,
    total: Number,
  },
  { timestamps: true }
);

const OrderModel = mongoose.model('Order', OrderSchema);
export default OrderModel;
