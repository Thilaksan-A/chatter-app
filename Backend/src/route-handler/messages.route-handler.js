import { getMessSchema, messSchema } from "../lib/types.lib.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js"

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({
            _id: { $ne: req.user._id }
        }).select("-password");

        return res.json(users)
    } catch (e) {
        console.log("Unable to fetch all users: " + e);
        res.status(500).json({
            msg: "Internal Server error"
        })
    }
}

export const sendMessage = async (req, res) => {
    const data = req.body
    let success =  messSchema.safeParse(data);
    if (!success) {
        return res.status(404).json({
            msg: "Invalid Inputs",
            err: "INPUT_ERR"
        })
    }
    try {
        let msg = await Message.create({
            msg: data.msg,
            sender: req.user._id,
            receiver: data.receiver,
        });
    
        return res.json({
            status: "Message created successfully",
            msg: msg,
        })
    } catch (e) {
        console.log("Unable to send msg: " + e);
        res.status(500).json({
            msg: "Internal Server error"
        })
    }
    
}

export const getMessages = async (req, res) => {
    // const data = req.body;
    const { receiver } = req.query
    let success =  getMessSchema.safeParse({receiver});
    if (!success) {
        return res.status(404).json({
            msg: "Invalid Inputs",
            err: "INPUT_ERR"
        })
    }

    try {
        let msgs = await Message.find({
            $or: [
                {
                    sender: req.user._id,
                    receiver: receiver
                },
                {
                    sender: receiver,
                    receiver: req.user._id
                }
            ]
        })
    
        return res.json(msgs)
    } catch (e) {
        console.log("Unable to fetch msgs: " + e);
        res.status(500).json({
            msg: "Internal Server error"
        })
    }
}