const express = require("express")
const app = express()
const PORT = 8000

// Connection with MongoDb
const { connectMongoDb } = require('./connection.js')
connectMongoDb("mongodb://127.0.0.1:27017/userdb-app-2")
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log('Mongo Error ', err))

// middlewares - plugin
const { logReqRes } = require('./middlewares/index.js')
app.use(express.urlencoded({ extended: false })) // convert FORM raw data to JSON format
app.use(express.json())
app.use(logReqRes("./log.txt"))

// Routes
const userRouter = require('./routes/user.js')
app.use('/api/users', userRouter)

app.listen(PORT, () => console.log(`Server started on PORT:${PORT}`))