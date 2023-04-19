import api from './api';
import Bike from '@/types/bike.type';

const BikeAPI = {
  getAll() {
    return api.get('/bikes');
  },

  get(id: string) {
    return api.get(`/bikes/${id}`);
  },
  create(data:Bike) {
    return api.post('/bikes', toString());
  },

  update(id: string, data: any) {
    return api.put(`/bikes/${id}`, data);
  },

  delete(id: string) {
    return api.delete(`/bikes/${id}`);
  }
};

export default BikeAPI;
