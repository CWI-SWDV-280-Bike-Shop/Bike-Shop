import dotenv from 'dotenv';
dotenv.config();

export default {
  secret: process.env.JWT_SECRET,
  accessTokenExpiration: 3600, // 1 hour
  refreshTokenExpiration: 86400, // 24 hours
  permissions: {
    admin: {
      collections: {
        orders: {
          create: {},
          read: {},
          update: {},
          delete: {},
        },
        users: {
          create: {},
          read: {},
          update: {},
          delete: {},
        },
        products: {
          create: {},
          read: {},
          update: {},
          delete: {},
        },
      },
    },
    customer: {
      collections: {
        users: {
          read: {
            onlyOwn: true,
            disallowedKeys: ['role', 'password'],
          },
          create: {
            onlyOwn: true,
            disallowedKeys: ['role'],
          },
          update: {
            onlyOwn: true,
            disallowedKeys: ['role'],
          },
          delete: {
            onlyOwn: true,
          },
        },
        orders: {
          create: {
            onlyOwn: true,
          },
          read: {
            onlyOwn: true,
          },
        },
        products: {
          read: {},
        },
      },
    },
    unauthenticated: {
      collections: {
        products: {
          read: {},
        },
      },
    },
  },

  //   TESTING
  //   accessTokenExpiration: 60, // 1 minute
  //   refreshTokenExpiration: 120, // 2 minutes
};
