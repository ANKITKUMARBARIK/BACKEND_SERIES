import express from "express";
import {
    handleSignup,
    handleSignin,
    handleLogout,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", handleSignup);
router.post("/signin", handleSignin);
router.get("/logout", handleLogout);

export default router;
