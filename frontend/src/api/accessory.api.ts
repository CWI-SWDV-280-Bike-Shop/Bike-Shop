import api from './api';

const AccessoryAPI = {
  getAll() {
    return api.get('/accessories');
  },

  get(id) {
    return api.get(`/accessories/${id}`);
  },

  create(data) {
    return api.post('/accessories', data);
  },

  update(id, data) {
    return api.put(`/accessories/${id}`, data);
  },

  delete(id) {
    return api.delete(`/accessories/${id}`);
  },
/*
  findByName(name) {
    return api.get(`/accessories?name=${name}`);
  },

  findByCategory(category) {
    return api.get(`/accessories?category=${category}`);
  },

  findByInStock(inStock) {
    return api.get(`/accessories?inStock=${inStock}`);
  },
  */
};

export default AccessoryAPI;
