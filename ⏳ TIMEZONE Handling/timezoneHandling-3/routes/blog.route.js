import express from "express";
import {
    handleAddBlog,
    handleGetBlog,
    handleComment,
} from "../controllers/blog.controller.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve("./public/uploads"));
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/", upload.single("coverImageURL"), handleAddBlog);
router.get("/:blogId", handleGetBlog);

router.post("/comment/:blogId", handleComment);

export default router;
