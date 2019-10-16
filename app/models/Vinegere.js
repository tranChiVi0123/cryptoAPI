const Mongoose = require('mongoose');

const VinegereSchema = Mongoose.Schema({
    key:{
        type: String,
        require: true,
    },
    primaryText:{
        type: String,
        require: true
    },
    cipherText:{
        type: String
    }
});

module.exports = Mongoose.model('Vinegere',VinegereSchema);