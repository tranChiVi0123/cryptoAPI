const express = require('express');
const router = express.Router();
const postController = require('../app/controllers/postControllers');


router.post('/', postController.new);

router.get('/', postController.view);

router.put('/:id', auth, postController.update);

router.delete('/:id', auth, postController.delete);

module.exports = router;