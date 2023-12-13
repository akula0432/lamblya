"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../utils/database"));
const users = class Users {
    constructor(user, coin, date, market) {
        this.user = user;
        this.coin = coin;
        this.date = date;
        this.market = market;
    }
    save() {
        return database_1.default.execute('INSERT INTO users (user, coin, date, market) VALUES (?, ?, ?, ?)', [this.user, this.coin, this.date, this.market]);
    }
    static find(user, coin, market) {
        return database_1.default.execute(`SELECT coin FROM users WHERE users.user = ? AND users.coin = ? AND users.market = ?`, [user, coin, market]);
    }
    static findAll(user) {
        return database_1.default.execute(`SELECT * FROM users WHERE users.user = ?`, [user]);
    }
    static delete(user, coin, market) {
        return database_1.default.execute(`DELETE FROM users WHERE users.user = ? AND users.coin = ? AND users.market = ?`, [user, coin, market]);
    }
};
exports.default = users;
