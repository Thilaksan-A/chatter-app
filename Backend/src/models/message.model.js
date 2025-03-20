import mongoose, { mongo } from "mongoose";


const messageSchema = new mongoose.Schema({
    msg: {
        type: String,
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})

const Message = mongoose.model("Message", messageSchema);