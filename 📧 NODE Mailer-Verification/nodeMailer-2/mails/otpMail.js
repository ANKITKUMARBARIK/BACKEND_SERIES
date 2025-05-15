import dotenv from "dotenv";
import transporter from "./transporter.mail.js";
import crypto from "crypto";
import { promises as fs } from "fs";

dotenv.config();

// Generate OTP
export const generateOtp = () => crypto.randomInt(100000, 999999).toString();

// otp mail
export async function sendOtpMail(fullName, email, otp) {
    try {
        // fetch html
        const htmlContent = await fs.readFile(
            "./mails/templates/otpVerify.html",
            "utf-8"
        );
        const finalHtml = htmlContent
            .replace("{{username}}", fullName)
            .replace("{{otp}}", otp);

        // mail options
        const mailOptions = {
            from: { name: "Blogify Team 🟢", address: process.env.APP_GMAIL },
            to: { name: fullName, address: email },
            subject: "OTP Verification",
            html: finalHtml,
            text: `Your OTP is ${otp}`,
        };

        // send mail
        const info = await transporter.sendMail(mailOptions);
        console.log("📩Mail sent ", info.response);
    } catch (error) {
        console.error("❌ Error sending mail:", error);
    }
}
