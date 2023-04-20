import api from './api';
import { Accessory } from '@/types/data.types';
import { AccessoryParams } from '@/types/parameter.types';

const AccessoryAPI = {
  create(data: Accessory) {
    return api.post('/accessories', data);
  },

  update(id: string, data: Accessory) {
    return api.put(`/accessories/${id}`, data);
  },

  delete(id: string) {
    return api.delete(`/accessories/${id}`);
  },

  getAll(params: AccessoryParams | null) {
    return api.get('/accessories', { params });
  },

  getById(id: string) {
    return api.get(`/accessories/${id}`);
  },
};

export default AccessoryAPI;
