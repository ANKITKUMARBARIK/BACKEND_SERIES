const express = require("express")
const app = express()
const PORT = 8000

// Connection MongoDb
const { mongoConnect } = require("./connection.js")
mongoConnect("mongodb://127.0.0.1:27017/short-url")
    .then(() => console.log('MongoDB connected...'))
    .catch((err) => console.log('Mongo Error ', err))

// Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Routes
const urlRoute = require("./routes/url.js")
app.use('/url', urlRoute)

app.listen(PORT, () => console.log(`Server started on PORT:${PORT}`))