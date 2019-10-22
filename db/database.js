const mongoose = require('mongoose');
const config = require('../config/index');

class Database {
    constructor() {
        this.__connect();
    }
    __connect() {
        mongoose.connect(config.mongoDb.connectionString, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, () => console.log('Api Ready...'));
        mongoose.Promise = global.Promise;
    }
}
module.exports = new Database();