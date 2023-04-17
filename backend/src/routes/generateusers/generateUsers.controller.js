import { NotFound } from '../errors.js';
import User from '../models/user.model.js';
import { readFile } from 'fs/promises';
const rando = JSON.parse(
  await readFile(
    new URL('../rando_data.json', import.meta.url)
  )
);
const maxQuantity = 100;
//Random Data Sources:
//  Names                https://www.census.gov/topics/population/genealogy/data/1990_census/1990_census_namefiles.html
//  Idaho Cities         https://en.wikipedia.org/wiki/List_of_cities_in_Idaho
//  Oregon Cities        https://en.wikipedia.org/wiki/List_of_cities_in_Oregon
//  Washington Cities    https://en.wikipedia.org/wiki/List_of_cities_in_Washington
//  Zipcode Info         https://www.unitedstateszipcodes.org
//  Street Names         https://www.livingplaces.com/streets/most-popular_street_names.html

/* const GenerateOrders = (quantity) => {
  let orders = []
  for (let i = 0; i < quantity; i++) {
    
    
  }
  return orders;
} */

const GenerateUsers = (quantity) => {
  let objects = [];
  for (let i = 0; i < quantity; i++) {
    const _fname = (Math.random()>0.5) ? (rando.firstName_m[Math.floor((Math.random()*rando.firstName_m.length))]) :
    rando.firstName_f[Math.floor((Math.random()*rando.firstName_f.length))];
    const _lname = rando.lastName[Math.floor((Math.random()*rando.lastName.length))];
    const suffices = ['com', 'org', 'edu', 'gov', 'mil'];
    const msuffix = suffices[Math.floor((Math.random()*suffices.length))];
    let _email;
    switch(Math.floor((Math.random()*6)) ){
      case 0: _email = `${_fname}${_lname.slice(0,1)}@mail.${msuffix}`; break;
      case 1: _email = `${_fname.slice(0,1)}${_lname}@mail.${msuffix}`; break;
      case 2: _email = `${_fname}${_lname}@mail.${msuffix}`; break;
      case 3: _email = `${_fname}.${_lname}@mail.${msuffix}`; break;
      case 4: _email = `${_fname}-${_lname}@mail.${msuffix}`; break;
      case 5: _email = `${_lname.slice(0,1)}${_fname}@mail.${msuffix}`; break;
    }
    _email = _email.toLowerCase();
    const _pass = (Math.random()*100000000).toString().replaceAll(/\d/g, c => 'qceRt$uboP'[c]).replace('.', 'A');
    const locationIndex = Math.round(Math.random()*2);
    let _city;
    let _state;
    //Area codes and zipcodes don't match cities because I didn't feel like it, but they match the state.
    let area_code;
    let _zipcode;
    switch(locationIndex){
      //My attempt at a weighted distribution so populous cities show up more often
      case 0: _city = rando.IdahoCities[Math.round(rando.IdahoCities.length / (Math.random() * rando.IdahoCities.length + 1))]; 
        _state = "ID";
        area_code = 208;
        _zipcode = Math.floor(Math.random() * (83877 - 83201 + 1) + 83201);
        break;
      case 1: _city = rando.OregonCities[Math.round(rando.OregonCities.length / (Math.random() * rando.OregonCities.length + 1))]; 
        _state = "OR";
        area_code = [458, 541, 503, 971][Math.round(Math.random()*3)]
        _zipcode = Math.floor(Math.random() * (9720 - 97001 + 1) + 97001)
        break;
      case 2: _city = rando.WashingtonCities[Math.round(rando.WashingtonCities.length / (Math.random() * rando.WashingtonCities.length + 1))]; 
        _state = "WA";
        area_code = [206, 253, 360, 425, 509, 564][Math.round(Math.random()*5)]
        _zipcode = Math.floor(Math.random() * (99403 - 98001 + 1) + 98001)
        break;
    }
    const _street = `${Math.round(5000 / (Math.random() * 1000 + 1))} ${rando.StreetNames[Math.floor((Math.random()*rando.StreetNames.length))]}`;
    
    objects.push({
      name: _fname.concat(" ", _lname),
      email: _email,
      password: _pass,
      phone: `(${area_code})${Math.floor(Math.random()*(900)+100)}-${Math.floor(Math.random()*(9000)+1000)}`,
      address: {
          street: _street,
          city: _city,
          state: _state,
          zip: _zipcode.toString(),
          country: "US"
      },
      role: "Customer"
    })
  }
  return objects;
}

const GenerateUsersController = {

    async createGeneratedUsers(req, res){
      try {
        let limitedQuantity = (!req.params.quantity) ? 1 : (req.params.quantity>maxQuantity) ? maxQuantity : req.params.quantity;
        let objects = GenerateUsers(limitedQuantity);
        let user;
        let newUser;
        objects.forEach(element => {
          user = new User(element);
          newUser = user.save();
        });
        
        const results = {
            result: "Pushed to database",
            quantity: limitedQuantity,
            objects: objects
            
        } 
        res.status(200).json(results);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    },

    async getGeneratedUsers(req, res) {
      try {
        let limitedQuantity = (!req.params.quantity) ? 1 : (req.params.quantity>maxQuantity) ? maxQuantity : req.params.quantity;
        
        const results = {
            quantity: limitedQuantity,
            objects: GenerateUsers(limitedQuantity)
        } 
        res.status(200).json(results);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  
  };
  
  export default GenerateUsersController;