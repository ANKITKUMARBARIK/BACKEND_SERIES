// const http = require("http")
const express = require("express")

// app -> handler function whose handles req,res
const app = express()

// app.METHOD(PATH, HANDLER)
app.get('/', (req, res) => {
    return res.send('Hello from HomePage')
})

app.get('/about', (req, res) => {
    // http://localhost:8000/about?myname=admin&age=21
    return res.send('Hello from AboutPage' + ' hey ' + req.query.myname + ' your are ' + req.query.age)
})


// const myServer = http.createServer(app)
// myServer.listen(8000, () => console.log('Server started...'))
app.listen(8000, () => console.log('Server started...'))


// NOTE:- Remember 'http' internally works in 'express' framework..that's why we do't need to write (createServer((req,res)) -> handlerfunction)

// Express really make easy to write code about server or handling messy code..