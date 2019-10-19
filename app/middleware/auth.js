const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
require('dotenv/config');

const auth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const data = jwt.verify(token, process.env.JWT_KEY);
    try {
        let user = await User.findOne({ _id: data._id, 'tokens.token': token });
        if (!user) {
            throw new Error()
        }
        req.user = user;
        req.token = token;
        next();
    } catch (err) {
        res.status(401).send({ error: 'Not authorrized to access this resource' });
    }
}
module.exports = auth;