const express = require('express');
const router = express.Router();
const postController = require('../app/controllers/postControllers');
var auth = require('../app/middleware/auth');
var checkAuthor = require('../app/middleware/checkAuthor');


router.post('/', postController.new);

router.get('/', postController.view);

router.put('/:id', auth, checkAuthor, postController.update);

router.put('/me/:id', postController.sovle);

router.delete('/:id', auth, checkAuthor, postController.delete);

module.exports = router;