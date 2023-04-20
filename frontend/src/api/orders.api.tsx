import api from "./api";
import Orders from '@/types/order.type';

const OrderAPI = {
 
  create(data:Orders) {
    return api.post('/orders', data);
  },

  update(id:string, data:Orders) {
    return api.put(`/orders/${id}`, data);
  },

  delete(id:string) {
    return api.delete(`/orders/${id}`);
  },

 getAll() {
    return api.get('/orders');
  },

  get(id:string) {
    return api.get(`/orders/${id}`);
  }
};

export default OrderAPI;
