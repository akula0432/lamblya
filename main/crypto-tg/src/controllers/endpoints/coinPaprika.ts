import axios, { AxiosResponse } from 'axios';
import Coin from '../../models/coins';
const api_endpoint = 'https://api.coinpaprika.com/v1/ticker?limit=20';

const endpoint = async () => {
    try {
        await axios.get(api_endpoint).then(async (response: AxiosResponse) => {
            const respData = response.data;
            for (let i = 0; i < 20; i++) {
                const shop = 'CoinPaprika';
                const short = respData[i].symbol;
                const price = respData[i].price_usd;
                const date = new Date().toLocaleDateString();
                const time = new Date().toLocaleTimeString();
                const coin = new Coin(shop, short, price, date, time);
                await coin.save();
            }
        });
    } catch (err) {
        console.log((err as Error).message);
    }
};

export default endpoint;
