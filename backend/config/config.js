export default {
  "ENV": "development",
  
  "domain": "localhost",
  "port": 8100,
  "onlyCore": true,
  "username": "root",
  "password": "",
  "database": "lab",
  "sequelizeOpts": {
    "port": 3306,
    "dialect": "mysql",
    "logging": false,
    "timezone": "-05:00",
    "dialectOptions": { 
    },
    "pool": {
      "max": 10,
      "min": 0,
      "acquire": 100000
    }
  }
}