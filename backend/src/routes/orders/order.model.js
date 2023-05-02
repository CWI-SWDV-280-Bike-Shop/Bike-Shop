import { mongoose } from '../../../src/mongoose.js';
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    autopopulate: true,
  },
  price: Number,
  quantity: Number,
  serviceDate: Date,
});

const OrderSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: { maxDepth: 1 },
    },
    items: [ItemSchema],
    shipping: Number,
    tax: Number,
    total: Number,
  },
  { timestamps: true }
);

const OrderModel = mongoose.model('Order', OrderSchema);
export default OrderModel;
