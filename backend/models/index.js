import config from '../config/config.js';
import Sequelize from 'sequelize';
// Models
import User from './user.js';
import Assistance from './assistance';

const Op = Sequelize.Op;


function Models() {

  this.models = {
    User,
    Assistance
  };

  this.sequelize = null;
  this.Sequelize = Sequelize;


  this.associate = function() {
    var names = Object.keys(this.models);
    for (var i = 0; i < names.length; i++) {
      var modelData = this.models[names[i]];

      var model = modelData(this.sequelize, this.Sequelize.DataTypes);
      // var model = this.sequelize.import(names[i], modelData);
      this[model.name] = model;
    }

    for (var i = 0; i < names.length; i++) {
      var modelName = names[i];
      console.log(names[i])
      if (this[modelName].associate) {
        this[modelName].associate(this);
      }
    }
  }

  this.connect = function() {
    this.sequelize = new Sequelize(config.database, config.username, config.password, {
      ...config.sequelizeOpts,
      operatorsAliases: this.operatorsAliases,
      benchmark: true,
      logging: (str, time) => {
        if (time > 2000) {
          this.QueryExecution.create({
            sql: str,
            ms: time
          });
        }
      }
    })
  }

  this.connect();
  this.associate();
}

export default Models; 
