import express from "express"

const router = express.Router();

router.get("/hi", (req, res) => {
    res.send("Hi from message route")
})

export default router;