const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
        //unique: true
    },
    description: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Book',BookSchema);