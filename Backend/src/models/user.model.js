import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    
    
});

const User = mongoose.model('User', userSchema);