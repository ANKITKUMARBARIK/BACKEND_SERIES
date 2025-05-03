const mongoose = require('mongoose')

const medicalRecordSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: tue,
        lowercase: true,
    },
}, { timestamps: true })

const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema)

module.exports = MedicalRecord