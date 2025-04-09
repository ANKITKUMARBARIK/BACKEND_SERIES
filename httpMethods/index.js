const http = require('http')
const fs = require('fs')

const myServer = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') return res.end()
    const log = `${Date.now()}: ${req.method} ${req.url} New Req Received\n`
    fs.appendFile('log.txt', log, (err, data) => {
        switch (req.url) {
            case '/':
                if (req.method === 'GET') res.end('HomePage')
                break
            case '/about':
                res.end('AboutPage')
                break
            case '/signup':
                if (req.method === 'GET') res.end('This is a SignUp Form')
                else if (req.method === 'POST') {
                    // DB Query
                    res.end('Success')
                }
                break
            default: res.end('404 Not Found')
        }
    })
})

myServer.listen(8000, () => console.log('Server started!'))