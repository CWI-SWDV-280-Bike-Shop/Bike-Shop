import api from './api';
import Accessory from '@/types/accessory.type';

const AccessoryAPI = {
  getAll() {
    return api.get('/accessories');
  },

  get(id : string) {
    return api.get(`/accessories/${id}`);
  },

  create(data :Accessory) {
    return api.post('/accessories', data);
  },

  update(id: string, data: Accessory) {
    return api.put(`/accessories/${id}`, data);
  },

  delete(id:string ) {
    return api.delete(`/accessories/${id}`);
  }
};

export default AccessoryAPI;
