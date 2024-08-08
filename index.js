import express from "express";
import cors from "cors";
import "dotenv/config";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome to Phora");
});

app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}`);
});
