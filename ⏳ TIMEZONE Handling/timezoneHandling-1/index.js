import express from "express";
import mongoConnect from "./connection.js";
import taskRouter from "./routes/task.route.js";
import path from "path";
import staticRouter from "./routes/staticRouter.route.js";

const app = express();
const PORT = 8000;

mongoConnect(
    "mongodb://admin:admin123@localhost:27017/timexone-task?authSource=admin"
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

// Viewer-based Timezone (Recommended)	User jab page dekhe, tab uska timezone (via dropdown ya JS detect) use karke sab task ka createdAt time convert karo.
