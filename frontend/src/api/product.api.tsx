import api from './api';
import { Products } from '@/types/data.types';
import { ProducsParams } from '@/types/parameter.types';

const ProductAPI = {
  create(data: Products) {
    return api.post('/products', data);
  },

  update(id: string, data: Products) {
    return api.put(`/products/${id}`, data);
  },

  delete(id: string) {
    return api.delete(`/products/${id}`);
  },

  getAll(params?: ProducsParams) {
    return api.get('/products', { params });
  },

  getById(id: string) {
    return api.get(`/products/${id}`);
  },
};

export default ProductAPI;
