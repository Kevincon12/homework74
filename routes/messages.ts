import express from "express";
import {promises as fs} from 'fs';

const path = '../messages';
const messagesRouter= express.Router();

messagesRouter.get("/", (req: express.Request, res: express.Response) => {
    res.send("получение всех сообщений");
});

messagesRouter.post("/", async (req: express.Request, res: express.Response) => {
    try {
        const messageData = req.body;

        const dateTime = new Date().toISOString();
        const dateTimeForWindows = dateTime.replace(/:/g, "-");

        const filePath = `${path}/${dateTimeForWindows}.txt`;
        await fs.mkdir(path, { recursive: true });

        await fs.writeFile(filePath, JSON.stringify(messageData));

        res.json({
            ...messageData,
            datetime: dateTime
        });

    } catch (err) {
        console.error(err);
    }
});

export default messagesRouter;