const fs = require("fs")

// Custom middlewares 
function logReqRes(filename) {
    return (req, res, next) => {
        fs.appendFile(filename, `${Date.now()} ${req.ip} ${req.method} ${req.path} ${req.url}\n`, (err, data) => {
            next()
        })
    }
}

module.exports = {
    logReqRes
}