"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const coinMarketCap_1 = __importDefault(require("../endpoints/coinMarketCap"));
const coinBase_1 = __importDefault(require("../endpoints/coinBase"));
const coinStats_1 = __importDefault(require("../endpoints/coinStats"));
const kucoin_1 = __importDefault(require("../endpoints/kucoin"));
const coinPaprika_1 = __importDefault(require("../endpoints/coinPaprika"));
const getEnpoints = () => {
    const task = node_cron_1.default.schedule('*/5 * * * *', () => {
        try {
            (0, coinBase_1.default)();
            (0, coinMarketCap_1.default)();
            (0, coinPaprika_1.default)();
            (0, coinStats_1.default)();
            (0, kucoin_1.default)();
            console.log(`Saved! ${new Date().toLocaleTimeString()}`);
        }
        catch (err) {
            console.log(err.message);
        }
    });
    task.start();
};
exports.default = getEnpoints;
