import { loginSchema, registerSchema } from "../lib/types.lib";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken"
import bcrypt from "bcr"
// todo add try catches

export const signup = async (req, res) => {
    const data = req.body;
    const success = registerSchema.safeParse(data);
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

    const hashedPass = bcrypt.hash(data.password, 10);

    const newUser = await User.create({
        email: data.email,
        fullName: data.fullName,
        password: hashedPass
    })

    const token = jwt.sign({
        id: newUser._id,
    }, process.env.JWT_PASS);
    
    res.cookie("chatter-token", token);
    res.json({
        msg: "successfully created new user"
    })
};


export const signin = async (req, res) => {
    const data = req.body;
    let success = loginSchema.safeParse(data);
    if(!success) {
        return res.status(400).json({
            msg: "Invalid Inputs",
            err: "INPUT_ERR"
        })
    }
    const user = await User.findOne({email: data.email})
    if (!user) {
        return res.status(404).json({
            msg: "Incorrect email or password",
            err: "INVALID_CRED"
        })
    }
    success = bcrypt.compare(user.password, user.password);
    if(!success) {
        return res.status(404).json({
            msg: "Incorrect email or password",
            err: "INVALID_CRED"
        })
    }


    const token = jwt.sign({
        id: newUser._id,
    }, process.env.JWT_PASS);
    
    res.cookie("chatter-token", token);
    res.json({
        msg: "successfully logged in"
    })
}

export const logout = async (req, res) => {
    res.cookie("chatter-token", "")
    res.status(200);
    res.json({});
}