import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateTokenForUser } from "../services/auth.service.js";
import { generateOtp, sendOtpMail } from "../mails/otpMail.js";
import { sendWelcomeMail } from "../mails/welcomeMail.js";

export async function handleSignup(req, res) {
    const { fullName, email, password, timezone } = req.body;
    if (!fullName || !email || !password || !timezone)
        return res.status(400).json("all fields req...");
    const user = await User.findOne({ email });
    if (user)
        return res.render("signup", { signupError: "User Already Exists" });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    // otp gen
    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    const result = await User.create({
        fullName,
        email,
        password: hash,
        timezone,
        otp,
        otpExpiry,
    });

    // mail config
    await sendOtpMail(result.fullName, result.email, result.otp);

    return res.render("otpverify", { email: result.email });
}

export async function handleVerifyOtp(req, res) {
    const { otpVerify } = req.body;
    const user = await User.findOne({ otp: otpVerify });
    if (!user)
        return res.render("otpverify", {
            otpverifyError: "Invalid or Expired Code",
        });
    if (user.otpExpiry < new Date())
        return res.render("otpverify", {
            otpverifyError: "Invalid or Expired Code",
        });
    // ✅ Update and save user
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    // send welcome mail configure
    await sendWelcomeMail(user.fullName, user.email);

    return res.redirect("/signin");
}

export async function handleSignin(req, res) {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json("all fields req...");
    const user = await User.findOne({ email });
    if (!user)
        return res.render("signin", {
            signinError: "Invalid Email or Password",
        });
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
        return res.render("signin", {
            signinError: "Invalid Email or Password",
        });
    // mail config
    if (!user.isVerified) {
        await sendOtpMail(user.fullName, user.email, user.otp);
        return res.render("otpverify", { email: user.email });
    }
    const token = generateTokenForUser(user);
    res.cookie("token", token);

    return res.redirect("/");
}

export async function handleLogout(req, res) {
    res.clearCookie("token");

    return res.redirect("/");
}
