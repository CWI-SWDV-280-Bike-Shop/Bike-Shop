import api from './api';
import Service from '@/types/service.type';

const ServiceAPI = {
  create(data:Service) {
    return api.post('/services', data);
  },

  update(id: string, data:Service) {
    return api.put(`/services/${id}`, data);
  },

  delete(id:string) {
    return api.delete(`/services/${id}`);
  },

  getAll() {
    return api.get('/services');
  },

  get(id:string) {
    return api.get(`/services/${id}`);}
};

export default ServiceAPI;
