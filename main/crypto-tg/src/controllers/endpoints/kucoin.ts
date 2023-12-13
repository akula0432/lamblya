import axios, { AxiosResponse } from 'axios';
import coins from '../../utils/coinsList';
import Coin from '../../models/coins';
const api_endpoint = 'https://api.kucoin.com/api/v1/prices';

const endpoint = async () => {
    try {
        await axios.get(api_endpoint).then(async (response: AxiosResponse) => {
            const respData = response.data.data;
            for (let i in respData) {
                const priceCoin = respData[i];
                coins.forEach(async (e) => {
                    if (e === i) {
                        const shop = 'Kucoin';
                        const short = i;
                        const price = priceCoin;
                        const date = new Date().toLocaleDateString();
                        const time = new Date().toLocaleTimeString();
                        const coin = new Coin(shop, short, price, date, time);
                        await coin.save();
                    }
                });
            }
        });
    } catch (err) {
        console.log((err as Error).message);
    }
};

export default endpoint;
