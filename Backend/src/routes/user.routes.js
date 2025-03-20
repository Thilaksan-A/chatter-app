import express from "express"
import { loginSchema, registerSchema } from "../lib/types.lib";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken"
import bcrypt from "bcr"
import { logout, signin, signup } from "../route-handler/user.route-handler";
const router = express.Router();

router.post("/signup", signup)

router.post("/sigin", signin)

router.post("/logout", logout);

export default router;