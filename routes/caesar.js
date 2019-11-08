const express = require('express');
const router = express.Router();
const caesarController = require('../app/controllers/caesarController');

router.post('/', caesarController.encryption);

module.exports = router;