import express from "express";

const router = express.Router();

router.route("/wordOfDay").get((req, res) => {
    res.status(200).json({ message: "Welcome to word of the day endpoint" });
});

export default router;
