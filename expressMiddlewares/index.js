const express = require("express")
const app = express()
const PORT = 8000

const fs = require("fs")

// Custom Middleware's
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} at ${new Date().toLocaleString()} -> MIDDLEWARE 1`);
    req.myEmail = 'ankitbarik.dev@gmail.com'
    fs.appendFile('./log.txt', `${req.method} ${req.path} ${req.url} at ${new Date().toLocaleString()} -> MIDDLEWARE 1\n`, (err, data) => {
        next()
    })
    // 🔁 What does next() do? next() is a function that tells Express: “Hey, I'm done with this middleware. Please move on to the next middleware or route handler.” If you don’t call next(), the request will get stuck in that middleware and never reach the final response.
})

// middleware -> Error Handling
app.use((req, res, next) => {
    const tokenKey = req.query.token  // req.query me URL ke query parameters hote hain. Agar tu URL me kuch aisa likhe:- http://localhost:8000/?token=hello123 -> req.query = { token: 'hello123' };
    if (tokenKey === 'secret123') {
        console.log(`${req.method} ${req.url} at ${new Date().toLocaleString()} -> MIDDLEWARE 2 ${req.myEmail}`);
        fs.appendFile('./log.txt', `${req.method} ${req.path} ${req.url} at ${new Date().toLocaleString()} -> MIDDLEWARE 2 ${req.myEmail}\n`, (err, data) => {
            next()
        })
    } else {
        next(new Error('Access Denied: Token missing or invalid!'))
    }
})

app.get('/', (req, res) => {
    console.log('Welcome! You have access - HomePage');
    return res.send('Welcome! You have access - HomePage')
})

app.get('/about', (req, res) => {
    console.log('Welcome! You have access - AboutPage');
    return res.send('Welcome! You have access - AboutPage')
})

app.listen(PORT, () => console.log(`Server started on PORT:${PORT}`))

// RUN:-
// http://localhost:8000/?token=secret123
// http://localhost:8000/about/?token=secret123