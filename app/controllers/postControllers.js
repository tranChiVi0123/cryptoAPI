const Post = require('../models/PostModel');

module.exports = {
    new: (req, res, next) => {//C
        console.log(req.body);
        res.send({ message: 'OK' });

    }
}
