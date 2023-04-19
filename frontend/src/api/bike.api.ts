import api from './api';
import Bike from '@/types/bike.type';

const BikeAPI = {
  getAll() {
    return api.get('/bikes');
  },

  get(id: string) {
    return api.get(`/bikes/${id}`);
  },
//Changed Bike to any 
  create(data: any) {
    return api.post('/bikes', data);
  },

  update(id: string, data: any) {
    return api.put(`/bikes/${id}`, data);
  },

  delete(id: string) {
    return api.delete(`/bikes/${id}`);
  },
/*
  findByName(name: string) {
    return api.get(`/bikes?name=${name}`);
  },

  findByCategory(category: string) {
    return api.get(`/bikes?category=${category}`);
  },

  findByInStock(inStock: boolean) {
    return api.get(`/bikes?inStock=${inStock}`);
  },

  findByColor(color: string) {
    return api.get(`/bikes?color=${color}`);
  },

  findBySize(size: string) {
    return api.get(`/bikes/size=${size}`);
  },

  findByGender(gender: string) {
    return api.get(`/bikes/gender=${gender}`);
  },
  */
};

export default BikeAPI;
