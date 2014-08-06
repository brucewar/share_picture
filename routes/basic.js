var express = require('express');
var router = express.Router();
var registerModule = require('./register_avatar.js');

/*upload Personal Image*/
router.get('/uploadownimage',registerModule.uploadOwnImage);
router.post('/uploadownimage',registerModule.postImage);

module.exports = router;
