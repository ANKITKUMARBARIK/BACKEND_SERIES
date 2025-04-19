const express = require("express")
const app = express()
const PORT = 8000

// connection
const { mongoConnect } = require("./connection.js")
mongoConnect("mongodb://127.0.0.1:27017/jwt-auth-bearer-app")
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log("Mongo Error ", err))


// middlewares
const cookieParser = require("cookie-parser")
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())


// ejs
const path = require("path")
app.set("view engine", 'ejs')
app.set("views", path.resolve('./views'))


// routes (urls)
// authentication middleware
const { restrictUserOnly } = require("./middlewares/auth.js")
const urlRouter = require("./routes/url.js")
app.use('/url', restrictUserOnly, urlRouter)


// routes (staticRouter)
const { checkAuth } = require("./middlewares/auth.js")
const staticRouter = require("./routes/staticRouter.js")
app.use('/', checkAuth, staticRouter)


// routes (authentication users)
const userRouter = require("./routes/user.js")
app.use('/user', userRouter)



app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`))