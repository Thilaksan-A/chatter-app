import express from "express"
import { loginSchema, registerSchema } from "../lib/types.lib.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { logout, signin, signup, currUser } from "../route-handler/user.route-handler.js";
import { protectedRoute } from "../middlewares/auth.middlewares.js";
const router = express.Router();

router.post("/signup", signup)

router.post("/signin", signin)

router.get("/currUser", protectedRoute, currUser);

router.post("/logout", logout);

export default router;