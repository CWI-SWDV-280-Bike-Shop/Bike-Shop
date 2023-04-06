import dotenv from 'dotenv';
dotenv.config();

const db = {
  MongoDBAtlas: `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASS}@bikeshop.v1dhfuf.mongodb.net/BikeShop?retryWrites=true&w=majority`,
};

export default db;
