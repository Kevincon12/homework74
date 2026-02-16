import express from "express";
import {promises as fs} from 'fs';

const path = '../messages';
const messagesRouter= express.Router();

messagesRouter.get("/", async (req: express.Request, res: express.Response) => {
    try{
        const filesNames = await fs.readdir(path);
        const sortedByDateFiles = filesNames.sort();
        const fiveMessages = sortedByDateFiles.slice(-5);

        const messagesToShow =[];

        for (const file of fiveMessages) {
            const filePath = `${path}/${file}`;
            const fileContent = await fs.readFile(filePath, "utf-8");
            const messagesObject = JSON.parse(fileContent);
            messagesToShow.push(messagesObject);
        }

        res.json(messagesToShow);
    } catch (err) {
        console.error(err);
    }
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