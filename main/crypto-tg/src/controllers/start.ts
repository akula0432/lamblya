import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const { BOT_TOKEN } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

const startMessage = async (chatId: number, text: string) => {
    await axios
        .post(`${TELEGRAM_API}/sendMessage`, {
            chat_id: chatId,
            text: `Hello, ${text}. Please send request with '/help' route to see all available commands.`,
        })
        .then((response: AxiosResponse) => {
            console.log('Message sent!');
        })
        .catch((err) => {
            console.log((err as Error).message);
        });
};

export default startMessage;
