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
const users_1 = __importDefault(require("../../models/users"));
const deleteFromFavAsk_1 = __importDefault(require("./deleteFromFavAsk"));
const { BOT_TOKEN } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;
const addTofavorites = (chatId, message, text, userName) => __awaiter(void 0, void 0, void 0, function* () {
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
            users_1.default.find(userName, short, market).then(([user]) => __awaiter(void 0, void 0, void 0, function* () {
                const findUser = user;
                if (findUser.length !== 0) {
                    yield axios_1.default
                        .post(`${TELEGRAM_API}/sendMessage`, {
                        chat_id: chatId,
                        text: `Coin is already in favorites!`,
                    })
                        .then((response) => {
                        (0, deleteFromFavAsk_1.default)(chatId, short, market, userName);
                        console.log('Message sent!');
                    })
                        .catch((err) => {
                        console.log(err.message);
                    });
                }
                else {
                    const users = new users_1.default(userName, short, date, market);
                    users.save();
                    yield axios_1.default
                        .post(`${TELEGRAM_API}/sendMessage`, {
                        chat_id: chatId,
                        text: `Coin is added to favorites!`,
                    })
                        .then((response) => {
                        console.log('Message sent!');
                    })
                        .catch((err) => {
                        console.log(err.message);
                    });
                }
            }));
        }
    }
    catch (err) {
        console.log(err.message);
    }
});
exports.default = addTofavorites;
