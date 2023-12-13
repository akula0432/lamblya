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
const coinBaseEndpoints_1 = __importDefault(require("../../utils/coinBaseEndpoints"));
const coins_1 = __importDefault(require("../../models/coins"));
const endpoint = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const promise = yield coinBaseEndpoints_1.default.map((endpoint) => __awaiter(void 0, void 0, void 0, function* () {
            return yield axios_1.default.get(endpoint).then((response) => __awaiter(void 0, void 0, void 0, function* () {
                const endRes = response.data.data;
                const shop = 'CoinBase';
                const short = endRes.base;
                const price = endRes.amount;
                const date = new Date().toLocaleDateString();
                const time = new Date().toLocaleTimeString();
                const coin = new coins_1.default(shop, short, price, date, time);
                yield coin.save();
            }));
        }));
        Promise.all([...promise]);
    }
    catch (err) {
        console.log(err.message);
    }
});
exports.default = endpoint;
