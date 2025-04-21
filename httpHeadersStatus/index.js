const express = require('express')
const app = express()
const PORT = 8000

const users = require('./MOCK_DATA.json')
const fs = require("fs")

// middlewares - plugin
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// display all users
app.get('/api/users', (req, res) => {
    console.log(req.headers);
    res.setHeader('X-myName', 'Ankit Barik')  // Custom Header
    // Always add X to custom headers
    return res.json(users)
})

app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const user = users.find((user) => user.id === id)
    // status: res(404 for Not Found)
    if (!user) return res.status(404).json({ error: "User Not Found" })
    return res.json(user)
})

// create new user - status: res(201 for created success)
app.post('/api/users', (req, res) => {
    const body = req.body
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        // status: res(400 for Bad Request)
        return res.status(400).json({ msg: "All fieldds are req..." })
    }
    users.push({ id: users.length + 1, ...body })
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.status(201).json({ status: "success", id: users.length })
    })
})

app.listen(PORT, () => console.log(`Server started on PORT:${PORT}`))

// HTTP Headers are an important part of the API request and response as they represent the meta-data associated with the API request and response.Headers carry information for The request and Response Body.


// HTTP response status codes:---->
// HTTP response status codes indicate whether a specific HTTP request has been successfully completed. Responses are grouped in five classes:
// 1. Informational responses (100 - 199)
// 2. Successful responses (200 - 299)
// 3. Redirection messages (300 - 399)
// 4. Client error responses (400 - 499)
// 5. Server error responses (500 - 599)