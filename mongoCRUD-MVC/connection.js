const mongoose = require("mongoose")

// Connection with mongodb
async function connectMongoDb(url) {
    return mongoose.connect(url)
}

module.exports = {
    connectMongoDb
}