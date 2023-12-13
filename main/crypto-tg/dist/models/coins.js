"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../utils/database"));
const coins = class Coins {
    constructor(shop, short, price, date, time) {
        this.shop = shop;
        this.short = short;
        this.price = price;
        this.date = date;
        this.time = time;
    }
    save() {
        return database_1.default.execute('INSERT INTO coins (shop, short, price, date, time) VALUES (?, ?, ?, ?, ?)', [
            this.shop,
            this.short,
            this.price,
            this.date,
            this.time,
        ]);
    }
    static find(market, short) {
        let date = new Date().toLocaleDateString();
        return database_1.default.execute(`SELECT * FROM coins WHERE coins1.shop = ? AND coins.short = ? AND coins.date = '${date}'`, [market, short]);
    }
    static findAll(market) {
        let date = new Date().toLocaleDateString();
        return database_1.default.execute(`SELECT * FROM coins WHERE coins.shop = ? AND coins.date = '${date}'`, [market]);
    }
    static findByTime(market, short) {
        let date = new Date().toLocaleDateString();
        return database_1.default.execute(`SELECT coins.price FROM coins WHERE coins.shop = ? AND coins.short = ? AND coins.date = '${date}'`, [market, short]);
    }
};
exports.default = coins;
