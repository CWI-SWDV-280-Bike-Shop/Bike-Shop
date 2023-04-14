import Order from './order.type';

type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  role: string;
  orders: [Order];
  createdAt: string;
  updatedAt: string;
};

export default User;
