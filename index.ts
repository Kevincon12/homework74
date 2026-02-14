import express from "express";

const app = express();

const port = 8000;

app.get("/", (req: express.Request, res: express.Response) => {
    res.send("Homework74trytrial");
})

app.listen(port, () => {
    console.log("Server running on port " + port);
});