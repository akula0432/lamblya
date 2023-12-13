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
const { BOT_TOKEN } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;
const listFavourite = (chatId, user) => __awaiter(void 0, void 0, void 0, function* () {
    const temp = [];
    users_1.default.findAll(user)
        .then(([user]) => __awaiter(void 0, void 0, void 0, function* () {
        const findUser = user;
        findUser.forEach((e) => {
            temp.push(`\nMarket: /${e.market} Coin: /${e.coin}`);
        });
    }))
        .then((resp) => __awaiter(void 0, void 0, void 0, function* () {
        yield axios_1.default
            .post(`${TELEGRAM_API}/sendMessage`, {
            chat_id: chatId,
            text: `List of favorite coins: \n${[...temp]}`,
        })
            .catch((err) => {
            console.log(err.message);
        });
    }));
});
exports.default = listFavourite;
