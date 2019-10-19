const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        require: true
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
        time: {
            _updateAt: Date.now
        }
    },
    solvedby: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});
module.exports = mongoose.model('Post',PostScheme);