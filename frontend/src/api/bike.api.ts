import { BikeQuery } from '@/types/queries.type';
import api from './api';
import Bike from '@/types/bike.type';

const BikeAPI = {
  getAll(query: BikeQuery | null) {
    return api.get('/bikes', { params: query });
  },

  get(id: string) {
    return api.get(`/bikes/${id}`);
  },
  create(data: Bike) {
    return api.post('/bikes', data);
  },

  update(id: string, data: Bike) {
    return api.put(`/bikes/${id}`, data);
  },

  delete(id: string) {
    return api.delete(`/bikes/${id}`);
  },
};

export default BikeAPI;
