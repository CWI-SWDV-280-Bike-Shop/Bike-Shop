import mongo from 'mongodb';
const { DB_URL } = process.env;

let conn = new mongo.MongoClient(DB_URL, { useUnifiedTopology: true });

const Dbo = {
  /**
   * Singleton-like Database Object that connects to the mongodb database
   */
  async getDbo() {
    if (!conn.isConnected()) await conn.connect();
    return conn.db();
  },
};

export default Dbo;

