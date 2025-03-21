import express from "express"
import { protectedRoute } from "../middlewares/auth.middlewares.js";
import { getMessages, getUsers, sendMessage } from "../route-handler/messages.route-handler.js";

const router = express.Router();

router.get("/users", protectedRoute, getUsers);

router.post("/send/", protectedRoute, sendMessage);

router.get("/messages", protectedRoute ,getMessages);

export default router;