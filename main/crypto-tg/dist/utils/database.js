"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const config_1 = require("../config/config");
const dataSource = config_1.DATA_SOURCES.mysql;
const initDB = mysql2_1.default.createPool({
    host: dataSource.host,
    user: dataSource.user,
    database: dataSource.database,
    password: dataSource.password,
});
exports.default = initDB.promise();
