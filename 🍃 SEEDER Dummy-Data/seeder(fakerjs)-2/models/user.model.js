import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
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
        role: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
