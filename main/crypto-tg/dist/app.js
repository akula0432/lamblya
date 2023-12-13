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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cronController_1 = __importDefault(require("./controllers/cron/cronController"));
const router_1 = __importDefault(require("./routes/router"));
const { BOT_TOKEN, SERVER_URL, HEROKU_URL } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;
const URI = `webhook/${BOT_TOKEN}`;
const WEBHOOK_URL = HEROKU_URL + URI;
const PORT = process.env.PORT || 3000;
const server = (0, express_1.default)();
// const init = async () => {
//     await axios
//         .get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
//         .then((res) => {
//             console.log(res.data);
//         })
//         .catch((err) => {
//             console.log((err as Error).message);
//         });
// };
server.use('/', router_1.default);
server.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
server.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, cronController_1.default)();
        console.log(`Server is running on port ${PORT}`);
        // await init();
    }
    catch (err) {
        console.log(err.message);
    }
}));
