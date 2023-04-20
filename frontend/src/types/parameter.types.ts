// for use when sending api requests
type ProductParams = {
  name?: string;
  category?: string;
  price?: number;
  inStock?: boolean;
};

export type AccessoryParams = ProductParams;
export type ServiceParams = ProductParams;

export type BikeParams = ProductParams & {
  material?: string;
  wheelSize?: string;
  color?: string;
  size?: string;
  gender?: string;
};

export type OrderParams = {
  customer: string;
};

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
