import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';
dotenv.config();


const { BOT_TOKEN } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

const deleteFromFavAsk = async (chatId: number, coin: string, market: string, user: string) => {
    await axios
        .post(`${TELEGRAM_API}/sendMessage`, {
            chat_id: chatId,
            text: `Do you want to delete on /${market} coin /${coin} from favorites?`,
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Delete!', callback_data: 'Delete!' },
                        { text: 'Keep', callback_data: 'Keep' },
                    ],
                ],
            },
        })
        .catch((err) => {
            console.log((err as Error).message);
        });
};

export default deleteFromFavAsk;
