import express from "express";

const router = express.Router();

router.route("/reflections").get((req, res) => {
    res.status(200).json({ message: "Welcome to reflections endpoint" });
});

export default router;
