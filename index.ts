import express from "express";
import messagesRouter from "./routes/messages";

const app = express();

const port = 8000;

app.use(express.json());

app.get("/", (req: express.Request, res: express.Response) => {
    res.send("Homework74trytrial");
});

app.use("/messages", messagesRouter);

app.listen(port, () => {
    console.log("Server running on port " + port);
});