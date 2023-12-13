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
const coins_1 = __importDefault(require("../../models/coins"));
const api_endpoint = 'https://api.coinpaprika.com/v1/ticker?limit=20';
const endpoint = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield axios_1.default.get(api_endpoint).then((response) => __awaiter(void 0, void 0, void 0, function* () {
            const respData = response.data;
            for (let i = 0; i < 20; i++) {
                const shop = 'CoinPaprika';
                const short = respData[i].symbol;
                const price = respData[i].price_usd;
                const date = new Date().toLocaleDateString();
                const time = new Date().toLocaleTimeString();
                const coin = new coins_1.default(shop, short, price, date, time);
                yield coin.save();
            }
        }));
    }
    catch (err) {
        console.log(err.message);
    }
});
exports.default = endpoint;
