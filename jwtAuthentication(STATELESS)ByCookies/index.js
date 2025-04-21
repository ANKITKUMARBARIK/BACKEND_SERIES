const express = require("express")
const app = express()
const PORT = 8000

// connection
const { mongoConnect } = require("./connection.js")
mongoConnect("mongodb://127.0.0.1:27017/jwt-auth-app")
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


// routes (url)
const urlRouter = require("./routes/url.js")
const { restrictToLoggedInUserOnly } = require("./middlewares/auth.js")
app.use("/url", restrictToLoggedInUserOnly, urlRouter)


// routes (authentication)
const userRouter = require("./routes/user.js")
app.use("/user", userRouter)


// routes (staticRouter)
const staticRouter = require("./routes/staticRouter.js")
const { checkRestrict } = require("./middlewares/auth.js")
app.use("/", checkRestrict, staticRouter)


app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`))