const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
require('dotenv/config');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const data = jwt.verify(token, process.env.JWT_KEY);
        let user = await User.findOne({ _id: data._id, 'tokens.token': token });
        if (!user) {
            return res.status(404).send({result:"Can't find user id."});
        }
        req.user = user;
        req.token = token;
        next();
    } catch (err) {
        res.status(401).send({ result: 'Not authorrized to access this resource' });
    }
}
module.exports = auth;