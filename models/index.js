var fs        = require('fs')
  , path      = require('path')
  , Sequelize = require('sequelize')
  , lodash    = require('lodash')
  , config    = require('../config').config
  , sequelize = new Sequelize(config.db.database, config.db.user, config.db.password,
                {
                  host: config.db.host,
                  port: config.db.port,
                  dialect: 'mysql'
                });
  var db = {};

sequelize
  .authenticate()
  .complete(function(err) {
    if (err) {
      throw err[0];
    } else {
      console.log('Connection has been established successfully');
    }
  });

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
});

module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db);