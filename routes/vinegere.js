const express = require('express');
const router = express.Router();
const vinegereController = require('../app/controllers/vinegereController');

router.post('/',vinegereController.encryption);
router.get('/',(req,res)=>{
    res.render('vinegere', { title: 'Vinegere' });
});

module.exports = router;