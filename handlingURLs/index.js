const http = require("http")
const fs = require("fs")
const url = require('url') // for parsing the url

const myServer = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') return res.end() // optional

    const log = `${Date.now()} ${req.url} New Request Received\n`
    const myUrl = url.parse(req.url, true)
    console.log(myUrl);

    fs.appendFile('log.txt', log, (err, data) => {
        switch (myUrl.pathname) {
            case '/':
                res.end('HomePage')
                console.log(log);
                break
            case '/about':
                res.end('AboutPage')
                console.log(log);
                break
            case '/contact':
                const username = myUrl.query.myname
                const searchQuery = myUrl.query.search_query
                res.end(`Hi ${username}, here are ur results for ${searchQuery}`)
                // res.end('ContactPage')
                console.log(log);
                break
            default:
                res.end('404 NOt Found BRooooooo!')
                console.log(log);
                break
        }
    })
})

myServer.listen(8000, () => console.log(`Server started`))


// http://localhost:8000/contact?myname=admin&userId=1&search_query=js+tic+tac+toe