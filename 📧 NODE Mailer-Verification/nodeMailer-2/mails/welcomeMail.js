import dotenv from "dotenv";
import transporter from "./transporter.mail.js";
import { promises as fs } from "fs";

dotenv.config();

// welcome mail
export async function sendWelcomeMail(fullName, email) {
    try {
        // fetch html
        const htmlContent = await fs.readFile(
            "./mails/templates/welcomeMail.html",
            "utf-8"
        );
        const finalHtml = htmlContent
            .replace("{{username}}", fullName)
            .replace("{{link}}", "http://localhost:8000/");

        // mail options
        const mailOptions = {
            from: { name: "Blogify Team 🟢", address: process.env.APP_GMAIL },
            to: { name: fullName, address: email },
            subject: `Welcome ${fullName}`,
            html: finalHtml,
            text: finalHtml,
            attachments: [
                {
                    filename: "default.png",
                    path: "./public/images/default.png",
                },
                {
                    filename: "default.png",
                    path: "./public/images/default.png",
                    cid: "img1-contentid",
                },
            ],
        };

        // send mail
        const info = await transporter.sendMail(mailOptions);
        console.log("📩Mail sent ", info.response);
    } catch (error) {
        console.error("❌ Error sending mail:", error);
    }
}
