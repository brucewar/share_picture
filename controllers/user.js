var sequelize = require('sequelize'),
	models = require('../models'),
	images = require('images'),
	config = require('../config').config,
	fs = require('fs'),
	utils = require('../libs/utils'),
	Log = require('log');
var User = models.User;
var Picture = models.Picture;

var stream = fs.createWriteStream(__dirname + '/../logs/' + utils.formatDate('YYYYMMDD') + '.log');
var log = new Log(config.log_level, stream);

exports.register = function(req, res, next) {
	var userId = req.params.user_id;
	User.find({
		where: {
			user_id: userId
		}
	}).success(function(user) {
		res.render('user/register', {
			user: user
		});
	}).error(function(err) {
		log.error('query user with user_id %s failed.', userId);
		next(err);
	});
};

exports.update = function(req, res, next) {
	var userId = req.body.userid;
	var nickName = req.body.nickname;
	var fileName = req.body.filename;
	var imageData = req.body.imagedata;
	var width = req.body.width;
	var height = req.body.height;
	var pointX = req.body.x;
	var pointY = req.body.y;
	var scale = req.body.scale;

	User.find({
		where: {
			nick_name: nickName
		}
	}).success(function(user) {
		if (user && user.user_id != userId) {
			res.json({
				status: 'failed',
				msg: '昵称已存在!'
			});
			res.end();
		} else {
			User.find({
				where: {
					user_id: userId
				}
			}).success(function(user) {
				if (user) {
					//用户已存在
					if (imageData) {
						//新头像
						var imagePath = utils.imageProcess(nickName, fileName, imageData, width, height, pointX, pointY, scale);
						Picture.create({
							upload_date: new Date(),
							fullimage_path: imagePath.origin,
							thumbnail_path: imagePath.croped,
							is_avatar: 1,
							user_id: userId
						})
							.success(function() {
								User.update({
									nick_name: nickName,
									avatar_path: imagePath.croped
								}, {
									user_id: userId
								}).success(function() {
									res.json({
										status: 'success',
										data: '/user/' + userId
									});
								}).error(function(err) {
									log.error('update user info failed.');
									res.json({
										status: 'failed',
										msg: '用户信息更新失败!'
									});
								});
							}).error(function(err) {
								log.error('add new avatar path failed.');
								res.json({
									status: 'failed',
									msg: '图片上传失败!'
								});
							});
					} else {
						//未更新头像
						User.update({
							nick_name: nickName
						}, {
							user_id: userId
						}).success(function() {
							res.json({
								status: 'success',
								data: '/user/' + userId
							});
						}).error(function(err) {
							log.error('update user nickname failed.');
							res.json({
								status: 'failed',
								msg: '用户信息更新失败!'
							});
						});
					}
				} else {
					//用户不存在
					if (imageData) {
						//有头像
						var imagePath = utils.imageProcess(nickName, fileName, imageData, width, height, pointX, pointY, scale);
						User.create({
							user_id: userId,
							nick_name: nickName,
							avatar_path: imagePath.croped
						}).success(function() {
							Picture.create({
								upload_date: new Date(),
								fullimage_path: imagePath.origin,
								thumbnail_path: imagePath.croped,
								is_avatar: 1,
								user_id: userId
							})
								.success(function() {
									res.json({
										status: 'success',
										data: '/user/' + userId
									});
								}).error(function(err) {
									log.error('add new avatar failed.');
									res.json({
										status: 'failed',
										msg: '用户信息添加失败!'
									});
								});
						}).error(function(err) {
							log.error('create user info failed.');
							res.json({
								status: 'failed',
								msg: '用户信息添加失败!'
							});
						});
					} else {
						//无头像
						User.create({
							user_id: userId,
							nick_name: nickName,
							avatar_path: ''
						}).success(function() {
							res.json({
								status: 'success',
								data: '/user/' + userId
							});
						}).error(function(err) {
							log.error('add new user info failed.');
							res.json({
								status: 'failed',
								msg: '用户信息添加失败!'
							});
						});
					}
				}
			});
		}
	}).error(function(err) {
		log.error('query user with nickname %s failed.', nickName);
		next(err);
	});
};