import fs from "fs";

function handleLogs(fileName) {
    return (req, res, next) => {
        fs.appendFile(
            fileName,
            `${Date.now()} ${req.ip} ${req.method} ${req.path} ${req.url}\n`,
            (err, data) => {
                next();
            }
        );
    };
}

export default handleLogs;
