import api from './api';
import Accessory from '@/types/accessory.type';
import { AccessoryQuery } from '@/types/queries.type';

const AccessoryAPI = {
  getAll(query: AccessoryQuery | null) {
    return api.get('/accessories', { params: query });
  },

  get(id: string) {
    return api.get(`/accessories/${id}`);
  },

  create(data: Accessory) {
    return api.post('/accessories', data);
  },

  update(id: string, data: Accessory) {
    return api.put(`/accessories/${id}`, data);
  },

  delete(id: string) {
    return api.delete(`/accessories/${id}`);
  },
};

export default AccessoryAPI;
