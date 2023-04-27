import dotenv from 'dotenv';
dotenv.config();

const isLocal = process.env.hasOwnProperty('MONGO_USER');

const db = {
  MongoDB: (isLocal) ? `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@bikeshop-mongo:27017/BikeShop?authSource=admin` :
    `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASS}@bikeshop.v1dhfuf.mongodb.net/BikeShop?retryWrites=true&w=majority`,
};

export default db;
