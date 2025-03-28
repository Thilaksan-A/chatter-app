import jwt from "jsonwebtoken"
import {User} from "../models/user.model.js"

export const protectedRoute = async (req, res, next) => {
    const token = req.cookies.chatterToken
    if (!token) {
        return res.status(401).json({
            msg: "Unauthorised access: no token found"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_PASS)
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (e) {
        console.log("unable to authenticate: " + e);
        return res.status(401).json({
            msg: "Unauthorised access: invalid token"
        })
    }
}