import api from "./api";

const OrderAPI = {
 
  create(data) {
    return api.post('/orders', data);
  },

  update(id, data) {
    return api.put(`/orders/${id}`, data);
  },

  delete(id) {
    return api.delete(`/orders/${id}`);
  },

 getAll() {
    return api.get('/orders');
  },

  get(id) {
    return api.get(`/orders/${id}`);
  },
  /*

  findByProduct(product){
    return api.get(`/orders?product=${product}`)
  },
  
  findByModel(productModel){
    return api.get(`/orders?productModel=${productModel}`)
  },
  
  findByPrice(price){
    return api.get(`/orders?price=${price}`)
  },
  
  findByQuantity(quantity){
    return api.get(`/orders?quantity=${quantity}`)
  },

  findByDate(serviceDate){
    return api.get(`/orders?serviceDate=${serviceDate}`)
  },

  findByCustomer(customer){
    return api.get(`/orders?customer=${customer}`)
  },

  findByItems(items){
    return api.get(`/orders?items=${items}`)
  },

  findByTotal(total){
    return api.get(`/orders?total=${total}`)
  },
  */
};

export default OrderAPI;
