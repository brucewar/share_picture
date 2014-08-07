exports.registerUser = function(req, res, next) {
  res.render('user/register');
};
exports.saveavatarImage = function(req, res, next) {
	console.log(req.body);
	console.log(1);

} ;