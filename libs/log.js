var Log = require('log');
var fs = require('fs');
var config = require('../config').config;
var path = require('path');
var utils = require('./utils');
var currentDay = utils.formatDate('YYYYMMDD');
var logpath = path.join(__dirname, '../logs', currentDay);
var logFile = [logpath,'log'].join('.');
var stream = fs.createWriteStream(logFile,
               { flags: 'a',
                 encoding: 'utf8',
                 mode: 0666
               });
module.exports = new Log(config.log_level, stream);