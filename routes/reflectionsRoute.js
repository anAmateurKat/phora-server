import express from "express";
import * as reflectionsController from "../controllers/reflectionsController.js";

const router = express.Router();

router
    .route("/reflections")
    .post(reflectionsController.createReflection)
    .get(reflectionsController.getReflections);

router
    .route("/reflections/:id")
    .get(reflectionsController.getSingleReflection)
    .put(reflectionsController.updateReflection);

export default router;
