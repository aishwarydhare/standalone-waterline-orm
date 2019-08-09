let Waterline = require('waterline');
let MySQLAdapter = require('sails-mysql');  // mysql://user:password@host:port/database
let MongoAdapter = require('sails-mongo');  // mongodb://user:password@host:port/database
let RedisAdapter = require('sails-redis');  // redis://user:password@localhost:6379

let cities = require('./models/cities');

let mysql_orm_instance = null;
let mongo_orm_instance = null;
let redis_orm_instance = null;

let db_types = Object.freeze({
  MYSQL: 1,
  MONGO: 2,
  REDIS: 3
});

let genericErrorLog = (e) => {
  console.log(e);
};

let initialise_db = (type) => {
  return new Promise((resolve, reject) => {
    let waterline = new Waterline();
    waterline.registerModel(cities);
    let config = null;
    switch (type) {
      case db_types.MYSQL:
        config = {
          adapters: {
            'sails-mysql': MySQLAdapter,
          },
          datastores: {
            default: {
              adapter: 'sails-mysql',
              url: 'mysql://user:password@host:port/database',
            }
          },
        };
        break;
      case db_types.MONGO:
        config = {
          adapters: {
            'sails-mongo': MongoAdapter,
          },
          datastores: {
            default: {
              adapter: 'sails-mongo',
              url: 'mongodb://user:password@host:port/database',
            }
          },
        };
        break;
      case db_types.REDIS:
        config = {
          adapters: {
            'sails-redis': RedisAdapter,
          },
          datastores: {
            default: {
              adapter: 'sails-redis',
              url: 'redis://user:password@localhost:6379',
            }
          },
        };
        break;
    }

    if(config == null){
        return reject("invalid database type given");
    }

    waterline.initialize(config, (err, ontology) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }

      // Tease out fully initialized models.
      resolve({
        Cities: ontology.collections.cities,
      });
    });
  });
};

let getDatabase = async (type) => {
  switch (type) {
    case db_types.MYSQL:
      if(mysql_orm_instance == null){
        mysql_orm_instance = await initialise_db(type).catch(genericErrorLog);
      }
      return mysql_orm_instance;
    case db_types.MONGO:
      if(mongo_orm_instance == null){
        mongo_orm_instance = await initialise_db(type).catch(genericErrorLog);
      }
      return mongo_orm_instance;
    case db_types.REDIS:
      if(redis_orm_instance == null){
        redis_orm_instance = await initialise_db(type).catch(genericErrorLog);
      }
      return redis_orm_instance;
  }

  return null;
};



module.exports = {
  DB_TYPES_ENUM: db_types,
  getDatabase: getDatabase,
};