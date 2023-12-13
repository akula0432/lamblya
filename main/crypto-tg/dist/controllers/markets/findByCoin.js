"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const coins_1 = __importDefault(require("../../models/coins"));
const users_1 = __importDefault(require("../../models/users"));
const { BOT_TOKEN } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;
const findByCoin = (chatId, text, userName) => __awaiter(void 0, void 0, void 0, function* () {
    if (text[0] === '/') {
        let coin = text
            .split('')
            .map((e) => (e !== '/' ? e : ''))
            .join('');
        yield axios_1.default
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
            .then((response) => {
            console.log('Message sent!');
        })
            .catch((err) => {
            console.log(err.message);
        });
    }
    else {
        const market = text.split('(')[0];
        const short = text
            .split('(')[1]
            .split('')
            .map((e) => (e !== ')' ? e : ''))
            .join('');
        let temp = [];
        coins_1.default.findByTime(market, short)
            .then(([coin]) => {
            let result = coin;
            result = result.reverse();
            let period30min = 0;
            let period1hour = 0;
            let period3hours = 0;
            let period6hours = 0;
            let period12hours = 0;
            let period1day = 0;
            try {
                for (let index = 0; index < 6; index++) {
                    period30min += Number(result[index].price);
                }
                period30min = period30min / 6;
                temp.push(`\n30 minutes: $${period30min.toFixed(5)}`);
            }
            catch (err) {
                period30min = 'Not enough data!';
                temp.push(`\n30 minutes: ${period30min}`);
            }
            try {
                for (let index = 0; index < 12; index++) {
                    period1hour += Number(result[index].price);
                }
                period1hour = period1hour / 12;
                temp.push(`\n1 hour: $${period1hour.toFixed(5)}`);
            }
            catch (err) {
                period1hour = 'Not enough data!';
                temp.push(`\n1 hour: ${period1hour}`);
            }
            try {
                for (let index = 0; index < 36; index++) {
                    period3hours += Number(result[index].price);
                }
                period3hours = period3hours / 36;
                temp.push(`\n3 hours: $${period3hours.toFixed(5)}`);
            }
            catch (err) {
                period3hours = 'Not enough data!';
                temp.push(`\n3 hours: ${period3hours}`);
            }
            try {
                for (let index = 0; index < 72; index++) {
                    period6hours += Number(result[index].price);
                }
                period6hours = period6hours / 72;
                temp.push(`\n6 hours: $${period6hours.toFixed(5)}`);
            }
            catch (err) {
                period6hours = 'Not enough data!';
                temp.push(`\n6 hours: ${period6hours}`);
            }
            try {
                for (let index = 0; index < 144; index++) {
                    period12hours += Number(result[index].price);
                }
                period12hours = period12hours / 144;
                temp.push(`\n12 hours: $${period12hours.toFixed(5)}`);
            }
            catch (err) {
                period12hours = 'Not enough data!';
                temp.push(`\n12 hours: ${period12hours}`);
            }
            for (let index = 0; index < result.length; index++) {
                period1day += Number(result[index].price);
            }
            period1day = period1day / result.length;
            temp.push(`\nToday: $${period1day.toFixed(5)}.`);
        })
            .then((resp) => __awaiter(void 0, void 0, void 0, function* () {
            users_1.default.find(userName, short, market).then(([user]) => __awaiter(void 0, void 0, void 0, function* () {
                const findUser = user;
                if (findUser.length === 0) {
                    yield axios_1.default
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
                        console.log(err.message);
                    });
                }
                else {
                    yield axios_1.default
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
                        console.log(err.message);
                    });
                }
            }));
        }))
            .catch((err) => __awaiter(void 0, void 0, void 0, function* () {
            yield axios_1.default
                .post(`${TELEGRAM_API}/sendMessage`, {
                chat_id: chatId,
                text: `No prices found for coin ${short} on ${market}! Try another market.`,
            })
                .catch((err) => {
                console.log(err.message);
            });
        }));
    }
});
exports.default = findByCoin;
