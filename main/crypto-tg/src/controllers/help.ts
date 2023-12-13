import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const { BOT_TOKEN } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

const helpMessage = async (chatId: number, text: string) => {
    await axios
        .post(`${TELEGRAM_API}/sendMessage`, {
            chat_id: chatId,
            text: `This bot shows actual prices for crypto coins. Here is all available commands: \n"/help" - shows all available commands and markets. \n"/listRecent" - shows last prices for market.\n"/listFavorites" - list your favourite coins.\nAvailable markets:
            '/coinMarketCap'
            '/coinPaprika'
            '/coinStats'
            '/coinBase'
            '/kuCoin'`,
            reply_markup: {
                keyboard: [['/start'], ['/help'], ['/listRecent'], ['/listFavorites']],
            },
        })
        .then((response: AxiosResponse) => {
            console.log('Message sent!');
        })
        .catch((err) => {
            console.log((err as Error).message);
        });
};

export default helpMessage;
