import express from "express";

const messagesRouter= express.Router();

messagesRouter.get("/", (req: express.Request, res: express.Response) => {
    res.send("получение всех сообщений");
});

messagesRouter.post("/", (req: express.Request, res: express.Response) => {
    res.send("отправка сообщения")
});

export default messagesRouter;