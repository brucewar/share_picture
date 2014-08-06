var express = require('express');
var router = express.Router();
var registerModule = require('./register_avatar.js');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

/*upload Personal Image*/
router.get('/uploadownimage',registerModule.uploadOwnImage);
router.post('/uploadownimage',registerModule.postImage);

module.exports = router;
