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
const express_1 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { BOT_TOKEN } = process.env;
const URI = `/webhook/${BOT_TOKEN}`;
const start_1 = __importDefault(require("../controllers/start"));
const help_1 = __importDefault(require("../controllers/help"));
const listRecent_1 = __importDefault(require("../controllers/markets/listRecent"));
const findAllCoinsByMarket_1 = __importDefault(require("../controllers/markets/findAllCoinsByMarket"));
const findByCoin_1 = __importDefault(require("../controllers/markets/findByCoin"));
const addToFavorites_1 = __importDefault(require("../controllers/favorites/addToFavorites"));
const listFavourite_1 = __importDefault(require("../controllers/favorites/listFavourite"));
const deleteFromFavorites_1 = __importDefault(require("../controllers/favorites/deleteFromFavorites"));
const body_parser_1 = __importDefault(require("body-parser"));
const router = (0, express_1.Router)();
router.use(body_parser_1.default.json());
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send('Hello there!');
}));
router.post(URI, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = 0;
        let message = '';
        let user = '';
        let data = '';
        let userName = '';
        if (req.body.callback_query) {
            id = req.body.callback_query.message.chat.id;
            data = req.body.callback_query.data;
            userName = req.body.callback_query.message.chat.username;
            message = req.body.callback_query.message.text;
        }
        else {
            id = req.body.message.chat.id;
            message = req.body.message.text;
            user = req.body.message.from.first_name;
            userName = req.body.message.from.username;
        }
        if (message === '/start') {
            (0, start_1.default)(id, user);
        }
        else if (message === '/help') {
            (0, help_1.default)(id, message);
        }
        else if (data === 'Delete!' || data === 'Keep') {
            (0, deleteFromFavorites_1.default)(id, data, message, userName);
        }
        else if (message === '/listRecent') {
            (0, listRecent_1.default)(id, message);
        }
        else if (message === '/listFavorites') {
            (0, listFavourite_1.default)(id, userName);
        }
        else if (data === 'Add to favorites!') {
            (0, addToFavorites_1.default)(id, data, message, userName);
        }
        else if (message === '/coinMarketCap' ||
            message === '/coinPaprika' ||
            message === '/coinStats' ||
            message === '/coinBase' ||
            message === '/kuCoin') {
            (0, findAllCoinsByMarket_1.default)(id, message);
        }
        else {
            (0, findByCoin_1.default)(id, message, userName);
        }
        return res.status(200).send('Ok');
    }
    catch (err) {
        console.log(err);
    }
}));
exports.default = router;
