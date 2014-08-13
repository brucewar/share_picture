var db = require('../models'),
  images = require('images'),
  log = require('../libs/log'),
	fs = require('fs');
  var User = db.user;
  var Picture = db.picture;



exports.register = function(req, res, next) {
	var userId = req.params.user_id;
	User.find({
      where: {
        user_id: userId
      }
    }
   ).success(function(user) {
		    res.render('user/register', {
			   user: user}
        )}
	 ).error(function(err) {
    console.log(err);
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
					if (imageData != '') {
						//新头像
						var imagePath = utils.imageProcess(nickName, fileName, imageData, width, height, pointX, pointY, scale);
						Picture.create({
							fullimage_path: imagePath.origin,
							thumbnail_path: imagePath.croped,
							is_avatar: 1,
							user_id: userId
						})
							.success(function() {
								user.nick_name = nickName;
								user.avatar_path = imagePath.croped;
								user.save().success(function() {
									res.json({
										status: 'success',
										croped: imagePath.croped
									});
									res.end();
								}).error(function(err) {
									log.error('update user info failed.');
									res.json({
										status: 'failed',
										msg: '用户信息更新失败!'
									});
								});
							}).error(function(err) {
								log.error('add new avatar failed.');
								res.json({
									status: 'failed',
									msg: '用户信息更新失败!'
								});
							});
					} else {
						//未更新头像
						user.nick_name = nickName;
						user.save().success(function() {
							res.redirect('/' + userId);
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
					if (imageData != '') {
						//有头像
						var imagePath = utils.imageProcess(nickName, fileName, imageData, width, height, pointX, pointY, scale);
						Picture.create({
							fullimage_path: imagePath.origin,
							thumbnail_path: imagePath.croped,
							is_avatar: 1,
							user_id: userId
						})
							.success(function() {
								User.create({
									user_id: userId,
									nick_name: nickName,
									avatar_path: imagePath.croped
								}).success(function() {
									res.json({
										status: 'success',
										croped: imagePath.croped
									});
									res.end();
								}).error(function(err) {
									log.error('create user info failed.');
									res.json({
										status: 'failed',
										msg: '用户信息添加失败!'
									});
								});
							}).error(function(err) {
								log.error('add new avatar failed.');
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
							res.redirect('/' + userId);
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