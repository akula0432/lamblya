import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';
dotenv.config();

import Coin from '../../models/coins';
import Users from '../../models/users';

const { BOT_TOKEN } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

const findByCoin = async (chatId: number, text: string, userName: string) => {
    if (text[0] === '/') {
        let coin = text
            .split('')
            .map((e: any) => (e !== '/' ? e : ''))
            .join('');
        await axios
            .post(`${TELEGRAM_API}/sendMessage`, {
                chat_id: chatId,
                text: `For what market do you want to see actual prices?`,
                reply_markup: {
                    keyboard: [
                        [`coinBase(${coin})`, `coinMarketCap(${coin})`],
                        [`coinPaprika(${coin})`, `coinStats(${coin})`],
                        [`kuCoin(${coin})`, '/help'],
                    ],
                },
            })
            .then((response: AxiosResponse) => {
                console.log('Message sent!');
            })
            .catch((err) => {
                console.log((err as Error).message);
            });
    } else {
        const market = text.split('(')[0];
        const short = text
            .split('(')[1]
            .split('')
            .map((e: string) => (e !== ')' ? e : ''))
            .join('');
        let temp: any = [];
        Coin.findByTime(market, short)
            .then(([coin]) => {
                let result: any = coin;
                result = result.reverse();
                let period30min: number | string = 0;
                let period1hour: number | string = 0;
                let period3hours: number | string = 0;
                let period6hours: number | string = 0;
                let period12hours: number | string = 0;
                let period1day: number | string = 0;
                try {
                    for (let index = 0; index < 6; index++) {
                        period30min += Number(result[index].price);
                    }
                    period30min = period30min / 6;
                    temp.push(`\n30 minutes: $${period30min.toFixed(5)}`);
                } catch (err) {
                    period30min = 'Not enough data!';
                    temp.push(`\n30 minutes: ${period30min}`);
                }
                try {
                    for (let index = 0; index < 12; index++) {
                        period1hour += Number(result[index].price);
                    }
                    period1hour = period1hour / 12;
                    temp.push(`\n1 hour: $${period1hour.toFixed(5)}`);
                } catch (err) {
                    period1hour = 'Not enough data!';
                    temp.push(`\n1 hour: ${period1hour}`);
                }
                try {
                    for (let index = 0; index < 36; index++) {
                        period3hours += Number(result[index].price);
                    }
                    period3hours = period3hours / 36;
                    temp.push(`\n3 hours: $${period3hours.toFixed(5)}`);
                } catch (err) {
                    period3hours = 'Not enough data!';
                    temp.push(`\n3 hours: ${period3hours}`);
                }
                try {
                    for (let index = 0; index < 72; index++) {
                        period6hours += Number(result[index].price);
                    }
                    period6hours = period6hours / 72;
                    temp.push(`\n6 hours: $${period6hours.toFixed(5)}`);
                } catch (err) {
                    period6hours = 'Not enough data!';
                    temp.push(`\n6 hours: ${period6hours}`);
                }
                try {
                    for (let index = 0; index < 144; index++) {
                        period12hours += Number(result[index].price);
                    }
                    period12hours = period12hours / 144;
                    temp.push(`\n12 hours: $${period12hours.toFixed(5)}`);
                } catch (err) {
                    period12hours = 'Not enough data!';
                    temp.push(`\n12 hours: ${period12hours}`);
                }
                for (let index = 0; index < result.length; index++) {
                    period1day += Number(result[index].price);
                }
                period1day = period1day / result.length;
                temp.push(`\nToday: $${period1day.toFixed(5)}.`);
            })
            .then(async (resp) => {
                Users.find(userName, short, market).then(async ([user]) => {
                    const findUser: any = user;
                    if (findUser.length === 0) {
                        await axios
                            .post(`${TELEGRAM_API}/sendMessage`, {
                                chat_id: chatId,
                                text: `Average prices on /${market} for coin /${short}: \n${[
                                    ...temp,
                                ]} \n\nDo you wish to add this coin to favorites?`,
                                reply_markup: {
                                    inline_keyboard: [[{ text: 'Add to favorites!', callback_data: 'Add to favorites!' }]],
                                },
                            })
                            .catch((err) => {
                                console.log((err as Error).message);
                            });
                    } else {
                        await axios
                            .post(`${TELEGRAM_API}/sendMessage`, {
                                chat_id: chatId,
                                text: `Average prices on /${market} for coin /${short}: \n${[
                                    ...temp,
                                ]} \n\nThis coin is in your favorites. Delete it from favorites?`,
                                reply_markup: {
                                    inline_keyboard: [[{ text: 'Delete!', callback_data: 'Delete!' }]],
                                },
                            })
                            .catch((err) => {
                                console.log((err as Error).message);
                            });
                    }
                });
            })
            .catch(async (err) => {
                await axios
                    .post(`${TELEGRAM_API}/sendMessage`, {
                        chat_id: chatId,
                        text: `No prices found for coin ${short} on ${market}! Try another market.`,
                    })
                    .catch((err) => {
                        console.log((err as Error).message);
                    });
            });
    }
};

export default findByCoin;
