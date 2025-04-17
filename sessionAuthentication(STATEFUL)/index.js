const express = require("express")
const app = express()
const PORT = 8000


// connection
const { mongoConnect } = require("./connection.js")
mongoConnect("mongodb://127.0.0.1:27017/auth-formhandle")
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log("Mongo Error ", err))


// middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
const { logReqRes } = require("./middlewares/index.js")
app.use(logReqRes("./log.txt"))
const cookieParser = require("cookie-parser")
app.use(cookieParser())

// ejs - SSR for frontend
const path = require("path")
app.set("view engine", 'ejs')
app.set("views", path.resolve("./views"))


// routes
// middleware authentication
const { restrictToLoggedinUserOnly } = require("./middlewares/auth.js")
const userRouter = require("./routes/user.js")
app.use('/user', restrictToLoggedinUserOnly, userRouter)
// app.use('/user',restrictToLoggedinUserOnly, userRouter) -> ab kya hoga n ki ye middleware(restrictToLoggedinUserOnly) tabhi chalega jabhi bhi ye /user se koi bhi request jaegi..


// static routes - main page
// middleware authentication
const { checkAuth } = require("./middlewares/auth.js")
const staticRoute = require("./routes/staticRouter.js")
app.use('/', checkAuth, staticRoute)


// authentication routes
const userAuthRoute = require("./routes/userAuth.js")
app.use("/userauth", userAuthRoute)


app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`))


// RUN:
// http://localhost:8000/signup  -> Signup
// http://localhost:8000/login  -> Login
// http://localhost:8000/  -> Main Page