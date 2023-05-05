// for use when sending api requests

// Products
export type ProductParams = {
  name?: string;
  category?: string;
  subcategory?: string;
  price?: number;
  inStock?: boolean;
  material?: string;
  wheelSize?: string;
  color?: string;
  size?: string;
};

// Orders
export type OrderParams = {
  customer: string;
};

// Users
export type UserParams = {
  name?: string;
  email?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  role?: string;
};
