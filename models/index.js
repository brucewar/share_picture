var sequelize = require('../db');
var Sequelize = require('sequelize');

exports.User = require('./user')(sequelize, Sequelize);
exports.Picture = require('./picture')(sequelize, Sequelize);
exports.Game = require('./game')(sequelize, Sequelize);