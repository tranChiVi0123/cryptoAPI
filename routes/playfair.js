const express = require('express');
const router = express.Router();
const playfairController = require('../app/controllers/playfairController');

router.post('/', playfairController.PlayfairControl);
router.get('/', (req, res, next) => {
    res.render('playfair', { title: 'Playfair' });
})

module.exports = router;