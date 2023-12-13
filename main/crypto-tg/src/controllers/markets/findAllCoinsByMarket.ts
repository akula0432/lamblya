import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';
dotenv.config();

import Coin from '../../models/coins';

const { BOT_TOKEN } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

const findByMarket = (chatId: number, text: string) => {
    let temp: any = [];
    let market = text
        .split('')
        .map((e: any) => (e !== '/' ? e : ''))
        .join('');
    Coin.findAll(market)
        .then(([markets]) => {
            let result: any = markets;
            result = result.reverse();
            const response: any = [];
            try {
                for (let i = 0; i < 20; i++) {
                    if (result[i] !== undefined) {
                        response.push(result[i]);
                    }
                }
                response.forEach(async (e: any) => {
                    let message = `\nCoin: /${e.short} \nPrice: $${e.price}`;
                    temp.push(message);
                });
            } catch (err) {
                console.log((err as Error).message);
            }
        })
        .then(async (resp) => {
            await axios
                .post(`${TELEGRAM_API}/sendMessage`, {
                    chat_id: chatId,
                    text: `Last actual prices for /${market}: ${[...temp]} \n\nClick on coin name to see more detailed information.`,
                })
                .then((response: AxiosResponse) => {
                    console.log('Message sent!');
                })
                .catch((err) => {
                    console.log((err as Error).message);
                });
        });
};

export default findByMarket;
