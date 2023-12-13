import { Router } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const { BOT_TOKEN } = process.env;
const URI = `/webhook/${BOT_TOKEN}`;

import startMessage from '../controllers/start';
import helpMessage from '../controllers/help';
import recentMessage from '../controllers/markets/listRecent';
import findByMarket from '../controllers/markets/findAllCoinsByMarket';
import findByCoin from '../controllers/markets/findByCoin';
import addTofavorites from '../controllers/favorites/addToFavorites';
import listFavourite from '../controllers/favorites/listFavourite';
import deleteFromFav from '../controllers/favorites/deleteFromFavorites';

import bodyParser from 'body-parser';
const router = Router();

router.use(bodyParser.json());

router.get('/', async (req, res) => {
    res.status(200).send('Hello there!');
});

router.post(URI, async (req, res) => {
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
        } else {
            id = req.body.message.chat.id;
            message = req.body.message.text;
            user = req.body.message.from.first_name;
            userName = req.body.message.from.username;
        }
        if (message === '/start') {
            startMessage(id, user);
        } else if (message === '/help') {
            helpMessage(id, message);
        } else if (data === 'Delete!' || data === 'Keep') {
            deleteFromFav(id, data, message, userName);
        } else if (message === '/listRecent') {
            recentMessage(id, message);
        } else if (message === '/listFavorites') {
            listFavourite(id, userName);
        } else if (data === 'Add to favorites!') {
            addTofavorites(id, data, message, userName);
        } else if (
            message === '/coinMarketCap' ||
            message === '/coinPaprika' ||
            message === '/coinStats' ||
            message === '/coinBase' ||
            message === '/kuCoin'
        ) {
            findByMarket(id, message);
        } else {
            findByCoin(id, message, userName);
        }
        return res.status(200).send('Ok');
    } catch (err) {
        console.log(err as Error);
    }
});

export default router;
