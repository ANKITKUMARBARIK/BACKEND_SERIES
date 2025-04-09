const http = require("http")
const fs = require("fs")
const path = require("path")
const url = require("url")

const myServer = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        const filePath = path.join(__dirname, 'index.html') // best approach for path
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500)
                res.end('Server Error')
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.end(data)
            }
        })
    } else if (req.url === '/feedback' && req.method === 'POST') {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        req.on('end', () => {
            const formData = new url.URLSearchParams(body);
            const feedback = {
                name: formData.get("name"),
                email: formData.get("email"),
                message: formData.get("message"),
                time: new Date().toISOString()
            }
            console.log("Feedback received:", feedback);
            fs.readFile('feedbacks.json', (err, data) => {
                const feed = data ? JSON.parse(data) : []
                feed.push(feedback)
                fs.writeFile('feedbacks.json', JSON.stringify(feed), (err) => {
                    res.writeHead(200, { "Content-Type": "text/plain" });
                    res.end(`Feedback received : ${JSON.stringify(feedback)}`)
                    // res.end("Feedback received. Thank you!");
                })
            })
        })
    } else {
        res.writeHead(404);
        res.end("Page not found");
    }
})

myServer.listen(8000, () => console.log('Server started..'))