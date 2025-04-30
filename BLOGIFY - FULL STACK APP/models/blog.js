const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    coverImageURL: {
        type: String,
        required: false,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
}, { timestamps: true })

const BLOG = mongoose.model("blogs", blogSchema)

module.exports = BLOG