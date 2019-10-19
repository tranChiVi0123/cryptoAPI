const express = require('express');
const router = express.Router();
const postController = require('../app/controllers/postControllers');
router.post('/',postController.new);

module.exports = router;