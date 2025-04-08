const { log } = require('console');
const fs = require('fs')

const logReqRes = (fileName) => {
    return (req, res, next) => {
        console.log("hello from Middleware");
          fs.appendFile(
            fileName,
            `${Date.now()} : ${req.ip} - ${req.method} - ${req.path}\n`,
            err => {
                console.log(err)
                next()
            }
          );
    }
}

module.exports = {
    logReqRes,
}