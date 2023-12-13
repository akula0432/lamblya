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
const api_endpoint = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=20&convert=USD';
const api_key = 'e06c8663-3101-464c-85c0-83e3d855620e';
const endpoint = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield axios_1.default
            .get(api_endpoint, {
            headers: {
                'X-CMC_PRO_API_KEY': api_key,
            },
        })
            .then((response) => {
            const respData = response.data.data;
            respData.forEach((e) => __awaiter(void 0, void 0, void 0, function* () {
                const shop = 'CoinMarketCap';
                const short = e.symbol;
                const price = e.quote.USD.price;
                const date = new Date().toLocaleDateString();
                const time = new Date().toLocaleTimeString();
                const coin = new coins_1.default(shop, short, price, date, time);
                yield coin.save();
            }));
        });
    }
    catch (err) {
        console.log(err.message);
    }
});
exports.default = endpoint;
