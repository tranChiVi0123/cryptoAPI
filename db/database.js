const mongoose = require('mongoose');
const config = require('../config/index');

class Database {
    constructor() {
        this.__connect();
    }
    __connect() {
        mongoose.connect(config.mongoDb.connectionString, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => console.log('connected to DB'));
        mongoose.Promise = global.Promise;
    }
}
module.exports = new Database();