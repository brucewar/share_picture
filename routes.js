var express = require('express');
var router = express.Router();
var user = require('./controllers/user');

//user manage
router.get('/:user_id', user.register);
router.post('/user/update', user.update);

module.exports = router;