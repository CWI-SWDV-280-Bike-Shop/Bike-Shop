import api from '../api';

const BikeService = {
  getAll() {
    return api.get('/bikes');
  },

  get(id) {
    return api.get(`/bikes/${id}`);
  },

  create(data) {
    return api.post('/bikes', data);
  },

  update(id, data) {
    return api.put(`/bikes/${id}`, data);
  },

  delete(id) {
    return api.delete(`/bikes/${id}`);
  },

  findByName(name) {
    return api.get(`/bikes?name=${name}`);
  },

  //   ['Mountain', 'Electric', 'Street']
  findByCategory(category) {
    return api.get(`/bikes?category=${category}`);
  },

  //   expects boolean
  findByInStock(inStock) {
    return api.get(`/bikes?inStock=${inStock}`);
  },

  //   [
  //     'Red',
  //     'Orange',
  //     'Yellow',
  //     'Green',
  //     'Blue',
  //     'Purple',
  //     'Black',
  //     'White',
  //     'Grey',
  //   ]
  findByColor(color) {
    return api.get(`/bikes?color=${color}`);
  },

  //   ['Small', 'Medium', 'Large']
  findBySize(size) {
    return api.get(`/bikes/size=${size}`);
  },

  // ['Mens', 'Womens', 'Neutral']
  findByGender(gender) {
    return api.get(`/bikes/gender=${gender}`);
  },
};

export default BikeService;
