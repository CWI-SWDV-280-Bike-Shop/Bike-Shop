import api from './api';
import { Bike } from '@/types/data.types';
import { BikeParams } from '@/types/parameter.types';

const BikeAPI = {
  create(data: Bike) {
    return api.post('/bikes', data);
  },

  update(id: string, data: Bike) {
    return api.put(`/bikes/${id}`, data);
  },

  delete(id: string) {
    return api.delete(`/bikes/${id}`);
  },

  getAll(params?: BikeParams) {
    return api.get('/bikes', { params });
  },

  getById(id: string) {
    return api.get(`/bikes/${id}`);
  },
};

export default BikeAPI;
