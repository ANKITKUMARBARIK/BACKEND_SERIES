import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateTokenForUser } from "../services/auth.service.js";

export async function handleSignup(req, res) {
    const { fullName, email, password, timezone } = req.body;
    if (!fullName || !email || !password || !timezone)
        return res.status(400).json({ msg: "all fields req..." });
    const user = await User.findOne({ email });
    if (user)
        return res.render("signup", { signupError: "User Already Exists" });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const result = await User.create({
        fullName,
        email,
        password: hash,
        timezone,
    });

    return res.redirect("/");
}

export async function handleSignin(req, res) {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ msg: "all fields req..." });
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
    const token = generateTokenForUser(user);
    res.cookie("token", token);

    return res.redirect("/");
}

export async function handleLogout(req, res) {
    res.clearCookie("token");

    return res.redirect("/");
}
