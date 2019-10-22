const express = require('express');
const router = express.Router();
const postController = require('../app/controllers/postControllers');


router.post('/',postController.new);

router.get('/',postController.view);

router.put('/:id',postController.update);

router.delete('/:id',postController.delete);

module.exports = router;