require('dotenv').config()

const express = require("express")
const app = express()
const PORT = process.env.PORT || 8000


// connection
const { mongoConnect } = require("./connection.js")
mongoConnect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log('Mongo Error ', err))


// middlewares
const path = require("path")
const { checkForAuthenticationCookie } = require("./middlewares/auth.js")
const cookieParser = require("cookie-parser")
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(checkForAuthenticationCookie)
app.use(express.static(path.resolve('./public')))


// ejs
app.set("view engine", 'ejs')
app.set("views", path.resolve('./views'))


// routes

// staticRouter
const staticRouter = require("./routes/staticRouter.js")
app.use('/', staticRouter)


// userRouter
const userRouter = require("./routes/user.js")
app.use('/user', userRouter)


// blogRouter
const blogRouter = require("./routes/blog.js")
app.use('/blog', blogRouter)


app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`))