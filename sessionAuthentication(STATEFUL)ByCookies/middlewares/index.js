const fs = require("fs")

function logReqRes(filePath) {
    return (req, res, next) => {
        fs.appendFile(filePath, `${new Date().toLocaleString()} ${req.ip} ${req.method} ${req.path} ${req.url}\n`, (err, data) => {
            next()
        })
    }
}

module.exports = {
    logReqRes
}