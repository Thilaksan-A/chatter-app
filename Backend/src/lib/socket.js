import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true
    }
});

let activeSocket = {}

export function receiverSocketId(userId) {
    return activeSocket[userId];
}

io.on("connection", (socket) => {
    console.log(socket.id + " :connected")
    const userId = socket.handshake.query.userId;
    activeSocket[userId] = socket.id;
    console.log(userId);
});


export {app, httpServer, io}