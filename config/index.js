require('dotenv/config')
module.exports = {
    mongoDb: {
        connectionString: process.env.DB_CONNECTION
    }
}