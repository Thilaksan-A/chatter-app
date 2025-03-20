import mongoose, { mongo } from "mongoose";

export async function dbConnect() {
    const dbURl = process.env.DB_URL;
    
    try {
        await mongoose.connect(dbURl);
        console.log("successfully connected to db")
    } catch (e) {
        console.log("unable to connect to db: " + e);
    }
}