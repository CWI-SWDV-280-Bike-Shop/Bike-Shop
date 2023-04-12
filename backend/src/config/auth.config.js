import dotenv from 'dotenv';
dotenv.config();

export default {
  secret: process.env.JWT_SECRET,
  accessTokenExpiration: 3600, // 1 hour
  refreshTokenExpiration: 86400, // 24 hours

  //   TESTING
  //   accessTokenExpiration: 60, // 1 minute
  //   refreshTokenExpiration: 120, // 2 minutes
};
