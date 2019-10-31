const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv/config');
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: (value) => {
            return validator.isEmail(value);
        }
    },
    password: {
        type: String,
        require: true,
        minLength: 7
    },
    point: {
        type: Number
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});
UserSchema.pre('save', async function (next) {
    let user = this;
    if (user.isModified('password')) {
        //console.log("pre Save");
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});
UserSchema.methods.generateAuthToken = async function () {
    let user = this;
    let token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}
UserSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}
const User = mongoose.model('User', UserSchema)

module.exports = User;