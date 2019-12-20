var express = require('express');
var router = express.Router();
var userControler = require('../app/controllers/userController');
var auth = require('../app/middleware/auth');
/* GET users listing. */
router.get('/', userControler.getAll);//=>test

router.get('/me/:id', auth, userControler.view);

router.get('/post/:id',auth,userControler.viewpost);

router.post('/me/logout/', auth, userControler.logout);

router.post('/me/logoutall', auth, userControler.logoutall);

router.post('/login', userControler.login);

router.post('/', userControler.new);

router.put('/me/:id', auth, userControler.update);

router.delete('/me/delete/:id', auth, userControler.removeOne);

router.delete('/deleteall', userControler.deleteAll);//=>test

module.exports = router;
