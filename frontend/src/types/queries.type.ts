interface ProductQuery {
  name?: string;
  category?: string;
  price?: number;
  inStock?: boolean;
}

export interface BikeQuery extends ProductQuery {
  material?: string;
  wheelSize?: string;
  color?: string;
  size?: string;
  gender?: string;
}

export type AccessoryQuery = ProductQuery;
export type ServiceQuery = ProductQuery;

export interface OrderQuery {
  customer: string;
}

export interface UserQuery {
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
}
