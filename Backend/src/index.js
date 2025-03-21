import express from "express"
import 'dotenv/config'
import cors from "cors"
import { dbConnect } from "./lib/db.lib.js"
import  messageRouter  from "./routes/messages.route.js"
import userRouter from "./routes/user.routes.js"
import bcrypt from "bcrypt"
import cookieParser from "cookie-parser"
import { app, httpServer } from "./lib/socket.js"
const SERVER_PORT = process.env.BACKEND_PORT;

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("HI")
})

app.use("/api/message", messageRouter);
app.use("/api/user",userRouter);


httpServer.listen(SERVER_PORT, () => {
    console.log("now listening on port: " + SERVER_PORT);
    dbConnect();
})