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
const { BOT_TOKEN } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;
const findByMarket = (chatId, text) => {
    let temp = [];
    let market = text
        .split('')
        .map((e) => (e !== '/' ? e : ''))
        .join('');
    coins_1.default.findAll(market)
        .then(([markets]) => {
        let result = markets;
        result = result.reverse();
        const response = [];
        try {
            for (let i = 0; i < 20; i++) {
                if (result[i] !== undefined) {
                    response.push(result[i]);
                }
            }
            response.forEach((e) => __awaiter(void 0, void 0, void 0, function* () {
                let message = `\nCoin: /${e.short} \nPrice: $${e.price}`;
                temp.push(message);
            }));
        }
        catch (err) {
            console.log(err.message);
        }
    })
        .then((resp) => __awaiter(void 0, void 0, void 0, function* () {
        yield axios_1.default
            .post(`${TELEGRAM_API}/sendMessage`, {
            chat_id: chatId,
            text: `Last actual prices for /${market}: ${[...temp]} \n\nClick on coin name to see more detailed information.`,
        })
            .then((response) => {
            console.log('Message sent!');
        })
            .catch((err) => {
            console.log(err.message);
        });
    }));
};
exports.default = findByMarket;
