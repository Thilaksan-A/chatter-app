import express from "express";
import 'dotenv/config'
import cors from "cors"
import { dbConnect } from "./lib/db.lib.js";
const SERVER_PORT = process.env.BACKEND_PORT;

console.log(SERVER_PORT);
const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("HI")
})


app.listen(SERVER_PORT, () => {
    console.log("now listening on port: " + SERVER_PORT);
    dbConnect();
})