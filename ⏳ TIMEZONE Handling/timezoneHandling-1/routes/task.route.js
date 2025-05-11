import express from "express";
import handleCreate from "../controllers/task.controller.js";

const router = express.Router();

router.post("/", handleCreate);

export default router;
