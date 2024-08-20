import express from "express";
import * as wordOfDayController from "../controllers/wordOfDayController.js";

const router = express.Router();

router.route("/wordOfDay").get(wordOfDayController.getWordOfDay);

export default router;
