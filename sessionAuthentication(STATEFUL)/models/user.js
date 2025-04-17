const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        required: true,
    },
    jobTitle: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userauths'  // ref ka matlab hai ki yeh field userauths collection ka reference hoga. Tumne 'userauths' name diya hai, iska matlab yeh field userauths collection ke kisi document ka reference store karega.
    }
}, { timestamps: true })

const User = mongoose.model("users", userSchema)

module.exports = User