set -e

mongosh <<EOF
use $MONGO_DBNAME

db.createUser({
  user: '$MONGO_USER',
  pwd: '$MONGO_PASS',
  roles: [{
    role: 'readWrite',
    db: '$MONGO_DBNAME'
  }]
})
EOF