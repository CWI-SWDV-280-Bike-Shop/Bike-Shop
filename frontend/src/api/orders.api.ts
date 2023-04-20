import api from './api';
import { Order } from '@/types/data.types';
import { OrderParams } from '@/types/parameter.types';

const OrderAPI = {
  create(data: Order) {
    return api.post('/orders', data);
  },

  update(id: string, data: Order) {
    return api.put(`/orders/${id}`, data);
  },

  delete(id: string) {
    return api.delete(`/orders/${id}`);
  },

  getAll(params: OrderParams | null) {
    return api.get('/orders', { params });
  },

  getById(id: string) {
    return api.get(`/orders/${id}`);
  },
};

export default OrderAPI;
