require('dotenv').config();

require('dotenv').config();

module.exports = {
  "development": {
    "use_env_variable": "DATABASE_URL", 
    "dialect": "postgres",
    "protocol": "postgres",  
    "dialectOptions":{
      "ssl": {
        "require": true,
      }
    }
  },
  "test": {
    "username": process.env.DB_USER, 
    "password": process.env.DB_PASSWORD,  
    "database": "database_test",
    "host": process.env.DB_HOST || 'localhost',  
    "dialect": "postgres", 
    "port": process.env.DB_PORT || 5432 
  },
  "production": {
    "username": process.env.DB_USER,  
    "password": process.env.DB_PASSWORD,  
    "database": process.env.DB_NAME,  
    "host": process.env.DB_HOST, 
    "dialect": "postgres",  
    "port": process.env.DB_PORT || 5432  
  },
}

