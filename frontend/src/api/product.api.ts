import api from './api';
import { Product } from '@/types/data.types';
import { ProductParams } from '@/types/parameter.types';

const ProductAPI = {
  create(data: Product) {
    return api.post('/products', data);
  },

  update(id: string, data: Product) {
    return api.put(`/products/${id}`, data);
  },

  delete(id: string) {
    return api.delete(`/products/${id}`);
  },

  getAll(params?: ProductParams) {
    return api.get('/products', { params });
  },

  getById(id: string) {
    return api.get(`/products/${id}`);
  },
};

export default ProductAPI;
