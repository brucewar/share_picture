var mysql = require('mysql');
var images = require('images');
exports.update = function(req, res, next) {
  var userId = req.params.userId
	if(!userId || '' == userId){
    res.render('user/index');
  }else{

  }
};
