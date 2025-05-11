import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const secret = process.env.SECRET_KEY;

export function generateTokenForUser(user) {
    const payload = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role,
        timezone: user.timezone,
    };
    return jwt.sign(payload, secret);
}

export function validateToken(token) {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}
