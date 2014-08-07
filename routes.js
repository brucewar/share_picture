var express = require('express');
var router = express.Router();
var user = require('./controllers/user');


router.get('/register', user.registerUser);
router.post('/uploadownimage', user.saveavatarImage);


module.exports = router;