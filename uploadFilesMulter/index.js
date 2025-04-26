const express = require("express")
const app = express()
const PORT = 8000


// middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


// ejs
const path = require("path")
app.set("view engine", 'ejs')
app.set("views", path.resolve('./views'))


// multer -> for upload file
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage })


// routes
app.get('/', (req, res) => {
    return res.render("homepage")
})

app.post('/upload', upload.single('profileImage'), (req, res) => {
    console.log(req.body)
    console.log(req.file)

    return res.redirect('/')
})

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`))