import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Dynamic Refs
// https://mongoosejs.com/docs/populate.html#dynamic-ref
const ItemSchema = new Schema({
  item: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'items.itemModel',
  },
  itemModel: {
    type: String,
    required: true,
    enum: ['Bike', 'Accessory', 'Service'],
  },
  price: Number,
  quantity: Number,
  serviceDate: Date
});

const OrderSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    items: [ItemSchema],
    total: Number,
  },
  { timestamps: true }
);

const OrderModel = mongoose.model('Order', OrderSchema);
export default OrderModel;
