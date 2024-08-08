import express from "express";

const PORT = 8080 || 5050;
const app = express();

app.get("/", (req, res) => {
    res.send("Welcome to Phora");
});

app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}`);
});
