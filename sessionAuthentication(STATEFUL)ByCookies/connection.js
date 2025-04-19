const mongoose = require("mongoose")

async function mongoConnect(url) {
    return mongoose.connect(url)
}

module.exports = {
    mongoConnect
}