import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

import getEnpoints from './controllers/cron/cronController';

import router from './routes/router';

const { BOT_TOKEN, SERVER_URL, HEROKU_URL } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;
const URI = `webhook/${BOT_TOKEN}`;
const WEBHOOK_URL = HEROKU_URL + URI;
const PORT = process.env.PORT || 3000;

const server = express();

// const init = async () => {
//     await axios
//         .get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
//         .then((res) => {
//             console.log(res.data);
//         })
//         .catch((err) => {
//             console.log((err as Error).message);
//         });
// };

server.use('/', router);

server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
});

server.listen(PORT, async () => {
    try {
        getEnpoints();
        console.log(`Server is running on port ${PORT}`);
        // await init();
    } catch (err) {
        console.log((err as Error).message);
    }
});
