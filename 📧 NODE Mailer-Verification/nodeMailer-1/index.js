import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";
import { promises as fs } from "fs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// mail configuration - nodemailer---------------------------->

// 1. Connection banana Gmail se
// 📌 Yeh kya kar raha?
// Yeh ek connection setup kar raha hai Gmail ke SMTP server se. Jaise hum courier service choose karte hain, waise hi hum Gmail choose kar rahe.
// service: 'gmail' → Hum Gmail ka SMTP server use kar rahe
// auth → Gmail account se login karne ke liye
// user → Tera Gmail ID
// pass → Gmail ka app password (jo tu 2FA ke baad banata hai)
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: true, // true (for 465)
    port: 465, // true for 465(SSL), false for other ports
    auth: {
        user: process.env.APP_GMAIL, // gmail
        pass: process.env.APP_PASSWORD, // gmail - app password
    },
});

app.get("/", (req, res) => {
    return res.send("Hello");
});

app.get("/mail", async (req, res) => {
    const htmlContent = await fs.readFile("./mail.html", "utf-8");

    // Agar dynamic values chahiye toh replace kar sakte ho
    const finalHtml = htmlContent
        .replace("{{username}}", "Dev")
        .replace("{{link}}", "https://devblogify.onrender.com/");

    //📌 Yeh kya kar raha?
    // 2. Kya bhejna hai uska detail
    const mailOptions = {
        from: { name: "Blogify Team 👨‍💻", address: process.env.APP_GMAIL },
        to: "falsegamerz0@gmail.com",
        cc: [
            { name: "Syncodx", address: "syncodx@gmail.com" },
            { name: "Mrutyunjay Bal", address: "mrutyunjaybal60614@gmail.com" },
        ],
        bcc: "balshubham65@gmail.com",
        subject: "Hello Bhai!",
        // 📌 Gmail by default html dikhata hai agar diya ho, text fallback hai.
        text: "Kaise ho bhai? Ye mail Node.js se bheja maine.",
        html: finalHtml, // can use external file
        // html: "Kaise ho bhai? Ye mail Node.js se bheja maine.",
        attachments: [
            {
                filename: "img1.jpg", // jo bhi naam rakhna ho
                path: "./public/images/img1.jpg", // image ka actual path
            },
            {
                filename: "banner.png",
                path: "./public/images/img2.png",
                cid: "img2-contentid", // yeh id html ke src me use hoti hai
            },
        ],
    };

    //📌 Yeh kya kar raha?
    // Ye mail ko bhej raha hai
    // Agar koi error aata hai, toh console mein dikhata hai
    // Agar mail successfully chala gaya, toh success message dikhata hai
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.log("Error ", err);
        console.log("Mail sent ", info.response);
    });

    return res.send("Mail sent successfully");
});

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));

// NOTES:-
// SMTP(Simple Mail Transfer Protocol) Email bhejne ka protocol
// App Password	Secure password jo Gmail 2FA ke sath generate hota hai
// Transporter	Nodemailer object jo SMTP se connect hota hai
// sendMail()	Function to actually send the email
// HTML Email	Visually styled email with HTML
// Attachments	Files like PDFs, images, etc. ke liye
// - cid:- banner.png ko HTML mein embed karna chahta hai, toh cid ko use karta hai
// name & address : name aur address ka use to, cc, bcc, from sab jagah kar sakta hai...... sender/receiver name or email.

// Nodemailer = Code se mail bhejne ka tarika
// SMTP = Mail bhejne ka rasta (like postman)

// 📦 Understand Flow:
// Nodemailer ko import karo
// Gmail ke SMTP server se connection banao (createTransport)
// Email ka content batao (mailOptions)
// Email bhej do (sendMail)
