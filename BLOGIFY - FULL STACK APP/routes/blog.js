const express = require("express")
const router = express.Router()
const { handleAddBlog, handleGetBlog, handleComment } = require("../controllers/blog.js")


// multer -> for image upload
const multer = require("multer")
const path = require("path")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve("./public/uploads"))
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`
        cb(null, fileName)
    }
})

const upload = multer({ storage: storage })
////////////////////////////////////////////////////////////////////////



router.post('/', upload.single('coverImageURL'), handleAddBlog)
router.get('/:id', handleGetBlog)


// comment routes
router.post('/comment/:blogId', handleComment)


module.exports = router