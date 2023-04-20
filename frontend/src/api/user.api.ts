import api from './api';
import { User } from '@/types/data.types';
import { UserParams } from '@/types/parameter.types';

const UserAPI = {
  create(data: User) {
    return api.post('/users', data);
  },

  update(id: string, data: User) {
    return api.put(`/users/${id}`, data);
  },

  delete(id: string) {
    return api.delete(`/users/${id}`);
  },

  getAll(params: UserParams | null) {
    return api.get('/users', { params });
  },

  getById(id: string) {
    return api.get(`/users/${id}`);
  },
};

export default UserAPI;
