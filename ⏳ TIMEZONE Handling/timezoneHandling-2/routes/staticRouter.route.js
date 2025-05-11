import express from "express";
import Task from "../models/task.model.js";
import moment from "moment-timezone";

const router = express.Router();

router.get("/", async (req, res) => {
    const userTimezone = req.query.tz || "UTC"; // Use the user's timezone from query or default to UTC

    const tasks = await Task.find({});

    // Convert stored UTC time to user timezone
    const tasksWithTime = tasks.map((task) => {
        const userTime = moment(task.createdAt)
            .tz(userTimezone)
            .format("DD-MM-YYYY HH:mm:ss z");
        return { ...task._doc, userTime };

        // task._doc: Mongoose ke document ka actual data hota hai jo MongoDB se fetch kiya gaya hai. Hum task._doc ko spread operator (...) se copy kar rahe hain.

        // userTime: Yeh converted time hai jo humne calculate kiya hai.

        // return { ...task._doc, userTime }: Hum original task data ke saath userTime ko add karke return kar rahe hain. Matlab, ab task object mein ek additional field userTime milega jo ki user ka local time hai.
    });

    return res.render("home", {
        allTask: tasksWithTime,
    });
});

export default router;
