export const roles = {
  admin: {
    collections: {
      orders: [
        {
          method: 'create'
        },
        {
          method: 'read'
        },
        {
          method: 'update'
        },
        {
          method: 'delete'
        }
      ],
      users: [
        {
          method: 'create'
        },
        {
          method: 'read'
        },
        {
          method: 'update'
        },
        {
          method: 'delete'
        }
      ],
      products: [
        {
          method: 'create'
        },
        {
          method: 'read'
        },
        {
          method: 'update'
        },
        {
          method: 'delete'
        }
      ]
    }
  },
  customer: {
    collections: {
      users: [
        {
          method: 'read',
          onlyOwn: true,
          disallowedKeys: ['role', 'password']
        },
        {
          method: 'create',
          onlyOwn: true,
          disallowedKeys: ['role']
        },
        {
          method: 'update',
          onlyOwn: true,
          disallowedKeys: ['role']
        },
        {
          method: 'delete',
          onlyOwn: true
        }
      ],
      orders: [
        {
          method: 'create',
          onlyOwn: true,
        },
        {
          method: 'read',
          onlyOwn: true
        }
      ],
      products: [
        {
          method: 'read'
        }
      ]
    }
  },
  unauthenticated: {
    collections: {
      products: [
        {
          method: 'read'
        }
      ]
    }
  }
}
