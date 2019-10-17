var express = require('express');
var router = express.Router();
var userControler = require('../app/controllers/userController');
var auth = require('../app/middleware/auth');
/* GET users listing. */
router.get('/', userControler.getAll);

router.get('/me', auth, userControler.view);

router.post('/me/logout/', auth, userControler.logout);

router.post('/me/logoutall',auth, userControler.logoutall);

router.post('/login', userControler.login);

router.post('/', userControler.new);

router.delete('/deleteall', userControler.deleteAll);

module.exports = router;
