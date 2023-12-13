import axios, { AxiosResponse } from 'axios';
import Coin from '../../models/coins';
const api_endpoint = 'https://api.coinstats.app/public/v1/coins?skip=0&limit=20&currency=USD';

const endpoint = async () => {
    try {
        await axios.get(api_endpoint).then((response: AxiosResponse) => {
            const respData = response.data.coins;
            respData.forEach(async (e: any) => {
                const shop = 'CoinStats';
                const short = e.symbol;
                const price = e.price;
                const date = new Date().toLocaleDateString();
                const time = new Date().toLocaleTimeString();
                const coin = new Coin(shop, short, price, date, time);
                await coin.save();
            });
        });
    } catch (err) {
        console.log((err as Error).message);
    }
};

export default endpoint;
