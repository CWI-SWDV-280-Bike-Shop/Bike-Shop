import dotenv from 'dotenv';
dotenv.config();

export default {
  secret: process.env.JWT_SECRET,
  accessTokenExpiration: 3600, // 1 hour
  refreshTokenExpiration: 86400, // 24 hours
  permissions: {
    admin: {
      collections: {
        orders: [
          {
            method: 'create',
          },
          {
            method: 'read',
          },
          {
            method: 'update',
          },
          {
            method: 'delete',
          },
        ],
        users: [
          {
            method: 'create',
          },
          {
            method: 'read',
          },
          {
            method: 'update',
          },
          {
            method: 'delete',
          },
        ],
        products: [
          {
            method: 'create',
          },
          {
            method: 'read',
          },
          {
            method: 'update',
          },
          {
            method: 'delete',
          },
        ],
      },
    },
    customer: {
      collections: {
        users: [
          {
            method: 'read',
            onlyOwn: true,
            disallowedKeys: ['role', 'password'],
          },
          {
            method: 'create',
            onlyOwn: true,
            disallowedKeys: ['role'],
          },
          {
            method: 'update',
            onlyOwn: true,
            disallowedKeys: ['role'],
          },
          {
            method: 'delete',
            onlyOwn: true,
          },
        ],
        orders: [
          {
            method: 'create',
            onlyOwn: true,
          },
          {
            method: 'read',
            onlyOwn: true,
          },
        ],
        products: [
          {
            method: 'read',
          },
        ],
      },
    },
    unauthenticated: {
      collections: {
        products: [
          {
            method: 'read',
          },
        ],
      },
    },
  },

  //   TESTING
  //   accessTokenExpiration: 60, // 1 minute
  //   refreshTokenExpiration: 120, // 2 minutes
};
