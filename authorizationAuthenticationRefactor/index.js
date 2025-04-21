const express = require("express")
const app = express()
const PORT = 8000

// connection
const { mongoConnect } = require("./connection.js")
mongoConnect("mongodb://127.0.0.1:27017/authorization-app")
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log("Mongo Error ", err))


// middlewares
const cookieParser = require("cookie-parser")
const { checkForAuthentication } = require("./middlewares/auth.js")
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(checkForAuthentication)


// ejs
const path = require("path")
app.set("view engine", 'ejs')
app.set("views", path.resolve('./views'))


// routes (url)
// AUTHORIZATION only for accessible by ("NORMAL","ADMIN") user
const urlRouter = require("./routes/url.js")
const { restrictTo } = require("./middlewares/auth.js")
app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRouter)


// routes (authentication)
const userRouter = require("./routes/user.js")
app.use("/user", userRouter)


// routes (staticRouter)
const staticRouter = require("./routes/staticRouter.js")
app.use("/", staticRouter)


app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`))


// RUN:-
// only ADMIN role can access http://localhost:8000/admin/urls ,but USER role can't..
// http://localhost:8000/  -> both ADMIN, USER can access
// http://localhost:8000/urls  -> both ADMIN, USER can access

// If any role access restrict role then show "UnAuthorized" msg..