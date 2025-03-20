import jwt from "jsonwebtoken"
export const protectedRoute = (req, res, next) => {
    const token = req.cookie.chatterToken
    if (!token) {
        return res.status(401).json({
            msg: "Unauthorised access: no token found"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_PASS)
        req.user = User.findById(decoded.id).select("-password");
        next();
    } catch (e) {
        console.log("unable to authenticate: " + e);
        return res.status(401).json({
            msg: "Unauthorised access: invalid token"
        })
    }
}