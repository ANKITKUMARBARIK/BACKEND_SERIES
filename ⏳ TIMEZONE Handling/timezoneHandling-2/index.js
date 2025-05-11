import express from "express";
import mongoConnect from "./connection.js";
import taskRouter from "./routes/task.route.js";
import path from "path";
import staticRouter from "./routes/staticRouter.route.js";

const app = express();
const PORT = 8000;

mongoConnect(
    "mongodb://admin:admin123@localhost:27017/timezone-task-3?authSource=admin"
)
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log("Mongo Error ", err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/task", taskRouter);
app.use("/", staticRouter);

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));

// Auto-detect Viewer Timezone via JS	Page load hone par browser ka timezone JavaScript se auto detect karo (e.g., Intl.DateTimeFormat().resolvedOptions().timeZone) aur backend ko send karo without user selection.
