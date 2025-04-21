const express = require("express")
const app = express()
const PORT = 8000

// Connection MongoDB
const { mongoConnect } = require("./connection.js")
mongoConnect("mongodb://127.0.0.1:27017/url-shortener")
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log("Mongo Error ", err))

// Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// EJS service -> for SSR
const path = require("path")
// This sets EJS as the view engine, telling Express to use EJS templates for SSR(Server Side Rendering) rendering views.
app.set("view engine", 'ejs')
app.set('views', path.resolve("./views")) // This sets the path where Express will look for the view templates (in this case, the views folder).


// Routes
const urlRouter = require("./routes/url.js")
app.use('/url', urlRouter)


// Static Router for Frontend Page
const staticRoute = require("./routes/staticRouter.js")
app.use("/", staticRoute)

app.listen(PORT, () => console.log(`Server started at PORT${PORT}`))


// Run:-
// Home - Create shortId & Get all URLs Tracking Analytics - http://localhost:8000/ 
// Update visitHistory by shortId - http://localhost:8000/url/:shortId 
// Get Analytics by shortId - http://localhost:8000/url/analytics/:shortId