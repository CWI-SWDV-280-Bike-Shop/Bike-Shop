type Data = {
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Address = {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
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
  address?: Address;
  orders?: [Order];
};

// Product
export type Product = Data & {
  name?: string;
  description?: string;
  category?: string;
  subcategory?: string;
  price?: number;
  imageIds?: string[];
  inStock?: boolean;
  brand?: string;
  material?: string;
  wheelSize?: string;
  color?: string;
  size?: string;
  gender?: string;
};

// Order
export type OrderItem = Data & {
  product: Product | string;
  price: number;
  quantity: number;
};

export type Order = Data & {
  customer?: User | string;
  items?: OrderItem[];
  shippingAddress: Address;
  total?: number;
};
