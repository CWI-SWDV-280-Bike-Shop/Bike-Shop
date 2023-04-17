import api from './api';

const ServiceAPI = {
  create(data) {
    return api.post('/services', data);
  },

  update(id, data) {
    return api.put(`/services/${id}`, data);
  },

  delete(id) {
    return api.delete(`/services/${id}`);
  },

  getAll() {
    return api.get('/services');
  },

  get(id) {
    return api.get(`/services/${id}`);
  },

  findByName(name) {
    return api.get(`/services?name=${name}`);
  },

  findByCategory(category) {
    return api.get(`/services?category=${category}`);
  },

  findByPrice(price) {
    return api.get(`/services?price=${price}`);
  },

  findByInStock(inStock) {
    return api.get(`/service?inStock=${inStock}`);
  },
  /*
findByImage(image) {
    return api.get(`/service?image=${image}`);
  },
  
  findByTimeStamp(timestamps) {
    return api.get(`/service?timestamps=${timestamps}`);
  },*/
};

export default ServiceAPI;
