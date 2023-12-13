import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';
dotenv.config();

import Users from '../../models/users';

const { BOT_TOKEN } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

const listFavourite = async (chatId: number, user: string) => {
    const temp: any = [];
    Users.findAll(user)
        .then(async ([user]) => {
            const findUser: any = user;
            findUser.forEach((e: any) => {
                temp.push(`\nMarket: /${e.market} Coin: /${e.coin}`);
            });
        })
        .then(async (resp) => {
            await axios
                .post(`${TELEGRAM_API}/sendMessage`, {
                    chat_id: chatId,
                    text: `List of favorite coins: \n${[...temp]}`,
                })
                .catch((err) => {
                    console.log((err as Error).message);
                });
        });
};

export default listFavourite;
