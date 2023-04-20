type Data = {
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
};

// Auth
export type Credentials = {
  email: string;
  password: string;
};

export type refreshToken = Data & {
  token: string;
  user: User;
};

export type AuthUser = Data & {
  name: string;
  email: string;
  password?: string;
  role: string;
  accessToken?: string;
  refreshToken?: string;
};

// User
export type User = AuthUser & {
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  orders?: [Order];
};

// Product
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
  brand?: string;
  material?: string;
  wheelSize?: string;
  color?: string;
  size?: string;
  gender?: string;
};

// Order
export type OrderItem = Data & {
  product?: Accessory | Service | Bike;
  productModel?: string;
  price?: number;
  quantity?: number;
};

export type Order = Data & {
  customer?: User;
  items?: [OrderItem];
  total?: number;
};
