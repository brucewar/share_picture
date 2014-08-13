var crypto = require('crypto');
var images = require('images');
var config = require('../config').config;
var path = require('path');
var fs = require('fs');
var Log = require('log');
var mkdir = require('mkdir');

/**
 * Format the date as you want.
 *
 * @param {Date} date
 * @param {String} format
 * @return {String}
 */
exports.formatDate = function(date, format) {
  if ('string' === typeof date) {
    format = date;
    date = new Date();
  }
  var regExp = /[^yYmMdDhHsSwW\s:-]/i;
  if ('' === format || regExp.test(format)) throw new Error("invalid formation.");
  var formatStr = format;
  var week = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
  formatStr = formatStr.replace(/yyyy|YYYY/, date.getFullYear().toString());
  formatStr = formatStr.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100));
  formatStr = formatStr.replace(/MM/, (date.getMonth() + 1) > 9 ? (date.getMonth() + 1).toString() : '0' + (date.getMonth() + 1));
  formatStr = formatStr.replace(/M/g, (date.getMonth() + 1).toString());
  formatStr = formatStr.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
  formatStr = formatStr.replace(/d|D/g, date.getDate().toString());
  formatStr = formatStr.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
  formatStr = formatStr.replace(/h|H/g, date.getHours().toString());
  formatStr = formatStr.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
  formatStr = formatStr.replace(/m/g, date.getMinutes().toString());
  formatStr = formatStr.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
  formatStr = formatStr.replace(/s|S/g, date.getSeconds().toString());
  formatStr = formatStr.replace(/w|W/g, week[date.getDay()]);
  return formatStr;
};

var stream = fs.createWriteStream(__dirname + '/../logs/' + exports.formatDate('YYYYMMDD') + '.log');
var log = new Log(config.log_level, stream);

exports.md5 = function(str) {
  var md5Hash = crypto.createHash('md5');
  md5Hash.update(str);
  str = md5Hash.digest('hex');
  return str;
};

exports.imageProcess = function(nickName, fileName, imageData, width, height, pointX, pointY, scale) {
  var userDir = path.join(config.upload_dir, nickName);
  log.debug('upload image to userDir: ' + userDir);
  mkdir.mkdirsSync(userDir);
  log.debug('mkdir userDir: %s success.', userDir);
  var imageType, now, originImageName, cropedImageName, savePath;
  imageType = fileName.substring(fileName.lastIndexOf('.'));
  fileName = fileName.substring(0, fileName.lastIndexOf('.'));
  imageData = imageData.split(';base64,')[1];
  imageData = new Buffer(imageData, 'base64');
  now = Date.now();
  originImageName = fileName + '_' + now + imageType;
  cropedImageName = fileName + '_' + now + '_thumbnail' + imageType;
  savePath = path.resolve(path.join(userDir, originImageName));
  var originImage = images(imageData);
  originImage.save(savePath);
  var cropedImage = images(originImage, pointX * scale, pointY * scale, width * scale, height * scale).size(128);
  savePath = path.resolve(path.join(userDir, cropedImageName));
  cropedImage.save(savePath);
  log.info('save new picture %s for %s successfully.', fileName, nickName);
  return {
    origin: '/uploads/' + nickName + '/' + originImageName,
    croped: '/uploads/' + nickName + '/' + cropedImageName
  };
};