import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';
dotenv.config();

import Users from '../../models/users';

const { BOT_TOKEN } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

const deleteFromFav = async (chatId: number, message: string, text: string, user: string) => {
    let temp = text
        .split(' ')
        .map((e) => (e[0] === '/' ? e : ''))
        .join('')
        .split('/');
    let market = temp[1];
    let short = temp[2]
        .split('')
        .map((e) => (e !== ':' ? e : ''))
        .join('');
    if (message === 'Delete!') {
        Users.delete(user, short, market).then(async ([resp]) => {
            await axios
                .post(`${TELEGRAM_API}/sendMessage`, {
                    chat_id: chatId,
                    text: `Coin deleted from favorites!`,
                })
                .then((response: AxiosResponse) => {
                    console.log('Message sent!');
                })
                .catch((err) => {
                    console.log((err as Error).message);
                });
        });
    } else if (message === 'Keep') {
        await axios
            .post(`${TELEGRAM_API}/sendMessage`, {
                chat_id: chatId,
                text: `Ok. Keeping it! \nSend "/help" to see all available commands.`,
            })
            .then((response: AxiosResponse) => {
                console.log('Message sent!');
            })
            .catch((err) => {
                console.log((err as Error).message);
            });
    }
};

export default deleteFromFav;
