const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    diagonsedWith: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    bloodGroup: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Others"],
        required: true,
    },
    admitedIn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital"
    },
}, { timestamps: true })

const Patient = mongoose.model("Patient", patientSchema)

module.exports = Patient