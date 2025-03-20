import express from "express"
import { loginSchema } from "../lib/types.lib";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken"
import bcrypt from "bcr"
const router = express.Router();

router.get("/signup", async (req, res) => {
    const data = req.body;
    const success = loginSchema.safeParse(data);
    if(!success) {
        return res.status(400).json({
            msg: "Invalid Inputs",
            err: "INPUT_ERR"
        })
    }
    const user = await User.findOne({email: data.email})
    if (user) {
        return res.status(400).json({
            msg: "User with email already exists",
            err: "DUP_EMAIL"
        })
    }

    const hashedPass = bcrypt.hash(data.password);
    

    const newUser = await User.create({
        email: data.email,
        fullName: data.fullName,
        password: data.password
    })


    

})

router.get("/sigin", (req, res) => {
    res.send("Hi from user route")
})
export default router;