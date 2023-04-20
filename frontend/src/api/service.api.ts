import api from './api';
import { Service } from '@/types/data.types';
import { ServiceParams } from '@/types/parameter.types';

const ServiceAPI = {
  create(data: Service) {
    return api.post('/services', data);
  },

  update(id: string, data: Service) {
    return api.put(`/services/${id}`, data);
  },

  delete(id: string) {
    return api.delete(`/services/${id}`);
  },

  getAll(params?: ServiceParams) {
    return api.get('/services', { params });
  },

  getById(id: string) {
    return api.get(`/services/${id}`);
  },
};

export default ServiceAPI;
