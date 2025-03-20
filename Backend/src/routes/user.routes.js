import express from "express"
import { loginSchema, registerSchema } from "../lib/types.lib.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { logout, signin, signup } from "../route-handler/user.route-handler.js";
const router = express.Router();

router.post("/signup", signup)

router.post("/sigin", signin)

router.post("/logout", logout);

export default router;