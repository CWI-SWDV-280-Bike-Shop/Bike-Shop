import api from '../api';

const ServiceService = {

create(data) {
    return api.post('/service', data);
  },

update(id, data) {
    return api.put(`/service/${id}`, data);
  },

  delete(id) {
    return api.delete(`/service/${id}`);
  },

  getAll() {
    return api.get('/service');
  },

  get(id) {
    return api.get(`/service/${id}`);
  },

  findByName(name) {
    return api.get(`/service?name=${name}`);
  },

  findByCategory(category) {
    return api.get(`/service?category=${category}`);
  },

findByPrice(price) {
    return api.get(`/service?price=${price}`);
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

export default ServiceService;
