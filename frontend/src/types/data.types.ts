type Data = {
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
};

// Users
export type User = Data & {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  role?: string;
  orders?: [Order];
  createdAt?: string;
  updatedAt?: string;
  accessToken?: string;
  refreshToken?: string;
};

export type Credentials = {
  email: string;
  password: string;
};

// Products
type Product = Data & {
  name?: string;
  description?: string;
  category?: string;
  price?: number;
  image?: string;
  inStock?: boolean;
};

export type Accessory = Product;
export type Service = Product;

export type Bike = Product & {
  material?: string;
  wheelSize?: string;
  color?: string;
  size?: string;
  gender?: string;
};

// Orders
type Item = Data & {
  product?: Accessory | Service | Bike;
  productModel?: string;
  price?: number;
  quantity?: number;
  serviceDate?: string;
};

export type Order = Data & {
  customer?: User;
  items?: [Item];
  total?: number;
};
