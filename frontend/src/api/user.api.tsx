import api from './api';

const UserAPI = {
 
  create(data) {
    return api.post('/users', data);
  },

  update(id, data) {
    return api.put(`/users/${id}`, data);
  },

  delete(id) {
    return api.delete(`/users/${id}`);
  },

 getAll() {
    return api.get('/users');
  },

  get(id) {
    return api.get(`/users/${id}`);
  },

  findByName(name){
    return api.get(`/users?name=${name}`)
  },

  findByEmail(email){
    return api.get(`/users?email=${email}`)
  },
  
  findByPassword(password){
    return api.get(`/users?password=${password}`)
  },

  findByPhone(phone){
    return api.get(`/users?phone=${phone}`)
  },
  
  findByAddress(address){
    return api.get(`/users?address=${address}`)
  },

  findByStreet(street){
    return api.get(`/users/address?street=${street}`)
  },
  findByCity(city){
    return api.get(`/users/address?city=${city}`)
  },
  findByState(state){
    return api.get(`/users/address?state=${state}`)
  },
  findByZip(zip){
    return api.get(`/users/address?zip=${zip}`)
  },
  findByCountry(country){
    return api.get(`/users/address?country=${country}`)
  },
  
  findByRole(role){
    return api.get(`/users?role=${role}`)
  },
  
  findByOrders(orders){
    return api.get(`/users?orders=${orders}`)
  },
};

export default UserAPI;
