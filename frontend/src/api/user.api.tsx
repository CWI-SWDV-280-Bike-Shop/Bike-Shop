import api from './api';
import User from '@/types/user.type';

const UserAPI = {
 
  create(data:User) {
    return api.post('/users', data);
  },

  update(id:string, data:User) {
    return api.put(`/users/${id}`, data);
  },

  delete(id:string) {
    return api.delete(`/users/${id}`);
  },

 getAll() {
    return api.get('/users');
  },

  get(id:string) {
    return api.get(`/users/${id}`);
  }
};

export default UserAPI;
