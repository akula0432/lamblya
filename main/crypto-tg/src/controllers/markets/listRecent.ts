import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const { BOT_TOKEN } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

const recentMessage = async (chatId: number, text: string) => {
    await axios
        .post(`${TELEGRAM_API}/sendMessage`, {
            chat_id: chatId,
            text: `List of available markets: \n'/coinBase', \n'/coinMarketCap', \n'/coinPaprika', \n'/coinStats', \n'/kuCoin',`,
            reply_markup: {
                keyboard: [
                    ['/coinBase', '/coinMarketCap'],
                    ['/coinPaprika', '/coinStats'],
                    ['/kuCoin', '/help'],
                ],
            },
        })
        .then((response: AxiosResponse) => {
            console.log('Message sent!');
        })
        .catch((err) => {
            console.log((err as Error).message);
        });
};

export default recentMessage;
