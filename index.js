import express from "express";
import cors from "cors";
import "dotenv/config";
import wordOfDayRoute from "./routes/wordOfDayRoute.js";
import reflectionsRoute from "./routes/reflectionsRoute.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/", wordOfDayRoute, reflectionsRoute);

app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}`);
});
