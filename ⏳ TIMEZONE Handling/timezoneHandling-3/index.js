import dotenv from "dotenv";
import http from "http";
import express from "express";
import mongoConnect from "./connection.js";
import path from "path";
import staticRouter from "./routes/staticRouter.route.js";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import checkForAuthentication from "./middlewares/auth.middleware.js";
import blogRouter from "./routes/blog.route.js";
import handleLogs from "./middlewares/index.logs.js";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT;

mongoConnect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log("Mongo Error ", err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthentication);
app.use(express.static(path.resolve("./public")));
app.use(handleLogs("./logs.txt"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/", staticRouter);
app.use("/user", userRouter);
app.use("/blog", blogRouter);

let onlineUsers = 0;
io.on("connection", (socket) => {
    onlineUsers++;
    io.emit("online-users", onlineUsers);

    socket.on("disconnect", () => {
        onlineUsers--;
        io.emit("online-users", onlineUsers);
    });
});

server.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));

//User Profile Timezone Setting (Advanced)	Har user ka account hota hai, jisme unka timezone save hota hai. Jab wo login kare, unka hi timezone use hota hai. 💡 Gmail/Facebook type systems.
