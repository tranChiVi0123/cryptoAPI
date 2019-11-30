const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const uniqueArrayPlugin = require('mongoose-unique-array');

const PostScheme = mongoose.Schema({
    plaintext: {
        type: String,
        trim: true,
        require: true
    },
    key: {
        type: String,
        trim: true,
        require: true
    },
    ciphertext: {
        type: String,
        trim: true,
        require: true
    },
    level: {
        type: Number,
        default: 1

    },
    description: {
        type: String,
        require: true,
        uppercase: true,
        //unique: true
    },
    caesar: {
        type: String,
        default: 'caesar'
    },
    submittedby: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    submittedon: {
        type: Date,
        default: Date.now
    },
    solvedby: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});
//PostScheme.plugin(uniqueArrayPlugin);
const Post = mongoose.model('Post', PostScheme);
module.exports = Post;