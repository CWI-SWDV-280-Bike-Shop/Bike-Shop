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

// Users
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
