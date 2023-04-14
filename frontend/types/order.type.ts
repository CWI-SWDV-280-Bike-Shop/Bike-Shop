import User from './user.type';

type Item = {
  product: object; // how do we handle Bike, Accesssory, and Service here? see orders model in backend
  productModel: string;
  price: number;
  quantity: number;
  serviceDate: string;
};

type Order = {
  _id: string;
  customer: User;
  items: [Item];
  total: number;
  createdAt: string;
  updatedAt: string;
};

export default Order;
