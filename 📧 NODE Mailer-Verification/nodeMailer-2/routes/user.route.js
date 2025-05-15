import express from "express";
import {
    handleLogout,
    handleSignin,
    handleSignup,
    handleVerifyOtp,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", handleSignup);
router.post("/signin", handleSignin);
router.get("/logout", handleLogout);
// otp verify
router.post("/verify-otp", handleVerifyOtp);

export default router;
