import { loginSchema, registerSchema } from "../lib/types.lib.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
// todo add try catches

export const signup = async (req, res) => {
    console.log("endpoint hit");
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

    const hashedPass = await bcrypt.hash(data.password, 10);

    const newUser = await User.create({
        email: data.email,
        fullName: data.fullName,
        password: hashedPass
    })
    const { password, ...userWithoutPassword } = newUser.toObject();

    const token = jwt.sign({
        id: newUser._id,
    }, process.env.JWT_PASS);
    
    res.cookie("chatterToken", token);
    res.json({
        user: userWithoutPassword,
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
    success = await bcrypt.compare(data.password, user.password);
    if(!success) {
        return res.status(404).json({
            msg: "Incorrect email or password",
            err: "INVALID_CRED"
        })
    }


    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_PASS);
    
    res.cookie("chatterToken", token);

    const { password, ...userWithoutPassword } = user.toObject();

    res.json({
        user: userWithoutPassword,
        msg: "successfully logged in"
    })
}

export const logout = async (req, res) => {
    res.cookie("chatterToken", "")
    res.status(200);
    res.json({});
}

export const currUser = async(req, res) => {
    res.json({
        user: req.user
    })
}