import express from "express"
import { protectedRoute } from "../middlewares/auth.middlewares";
import { getMessages, getUsers, sendMessage } from "../route-handler/messages.route-handler";

const router = express.Router();

router.get("/users", protectedRoute, getUsers);

router.post("/send/:uid", protectedRoute, sendMessage);

router.get("/messages/:uid", protectedRoute ,getMessages);

export default router;