// http -> built-in module
const http = require('http')
const fs = require('fs')

// create web server
const myServer = http.createServer((req, res) => {
    // console.log('New request received');
    // console.log(req.headers);
    const log = `${Date.now()}: ${req.url} New Req Received\n`
    fs.appendFile('log.txt', log, (err, data) => {
        // res.end('Hello from server Again!')
        switch (req.url) {
            case '/': res.end('HomePage')
            break
            case '/about': res.end('AboutPage')
            break
            default: res.end('404 Not Found')
        }
    })
})

myServer.listen(8000, () => console.log('Server started!'))