import dotenv from "dotenv";
import express from "express";
import mongoConnect from "./connection.js";
import path from "path";
import staticRouter from "./routes/staticRouter.route.js";
import userRouter from "./routes/user.route.js";
import checkForValidation from "./middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

mongoConnect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log("Mongo Error ", err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForValidation);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/", staticRouter);
app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));

// otp mail verification and send external file - ejs
// in signup process, send otp to verify email and after signuup send welcome mail to login our blog page.
