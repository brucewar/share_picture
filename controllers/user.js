exports.show = function(req, res, next) {
	res.render('user/index', {name: 'brucewar'});
}