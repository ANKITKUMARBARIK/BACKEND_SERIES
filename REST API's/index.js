const express = require("express")
const fs = require("fs")
const users = require('./MOCK_DATA.json')
const app = express()
const PORT = 8000

// Middleware - Plugin
app.use(express.urlencoded({ extended: false })) // -> ye form data handle karne ke liye use hoti hai. Matlab jab koi HTML form submit hoti hai (like <form method="POST">), toh uska data urlencoded format me aata hai — aur yeh middleware usi ko req.body me parse karta hai.
app.use(express.json()) // -> ye JSON data ko parse karne ke liye hoti hai — yaani agar tu Postman ya frontend se JSON format me data bhej raha hai, toh yeh middleware usse req.body me convert karta hai. 

// Routes
app.get('/users', (req, res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    res.send(html)
})

// REST API's

// Normal way for request -------------->
// app.get('/api/users',(req, res)=>{
// })

// app.get('/api/users/:id',(req, res)=>{
// })

// app.post('/api/users',(req,res)=>{
// })

// app.patch('/api/users/:id',(req,res)=>{ 
// })

// app.delete('/api/users/:id',(req,res)=>{
// })


// Modern way for request - Chaining in single route
app.route('/api/users')
    .get((req, res) => {
        return res.json(users)  // List all users
    }).post((req, res) => {
        const body = req.body
        users.push({ id: users.length + 1, ...body })
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
            return res.json({ status: "success", id: users.length })  // Create new user
        })
    })

app.route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id)
        const user = users.find((user) => user.id === id) // Get user with ID
        return res.json(user)
    }).patch((req, res) => {
        const id = Number(req.params.id)
        const index = users.findIndex((user) => user.id === id)
        if (index === -1) {
            return res.json({ status: "User not found" });
        }
        const body = req.body
        const updatedUser = { ...users[index], ...body }
        users[index] = updatedUser
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
            return res.json({ status: "updated" })  // Update user with ID
        })
    }).delete((req, res) => {
        const id = Number(req.params.id)
        const index = users.findIndex((user) => user.id === id)
        if (index === -1) {
            return res.json({ status: "User not found" });
        }
        users.splice(index, 1)
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
            return res.json({ status: "deleted", id: id })  // Delete user with ID
        })
    })




app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`))