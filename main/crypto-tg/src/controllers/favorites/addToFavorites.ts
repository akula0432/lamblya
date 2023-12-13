import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';
dotenv.config();

import Users from '../../models/users';
import deleteFromFav from './deleteFromFavAsk';

const { BOT_TOKEN } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

const addTofavorites = async (chatId: number, message: string, text: string, userName: string) => {
    try {
        const id = chatId;
        if (message === 'Add to favorites!') {
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
            const date = new Date().toLocaleDateString();
            Users.find(userName, short, market).then(async ([user]) => {
                const findUser: any = user;
                if (findUser.length !== 0) {
                    await axios
                        .post(`${TELEGRAM_API}/sendMessage`, {
                            chat_id: chatId,
                            text: `Coin is already in favorites!`,
                        })
                        .then((response: AxiosResponse) => {
                            deleteFromFav(chatId, short, market, userName);
                            console.log('Message sent!');
                        })
                        .catch((err) => {
                            console.log((err as Error).message);
                        });
                } else {
                    const users = new Users(userName, short, date, market);
                    users.save();
                    await axios
                        .post(`${TELEGRAM_API}/sendMessage`, {
                            chat_id: chatId,
                            text: `Coin is added to favorites!`,
                        })
                        .then((response: AxiosResponse) => {
                            console.log('Message sent!');
                        })
                        .catch((err) => {
                            console.log((err as Error).message);
                        });
                }
            });
        }
    } catch (err) {
        console.log((err as Error).message);
    }
};

export default addTofavorites;
