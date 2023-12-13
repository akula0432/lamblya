import axios, { AxiosResponse } from 'axios';
import endpoints from '../../utils/coinBaseEndpoints';
import Coin from '../../models/coins';

const endpoint = async () => {
    try {
        const promise = await endpoints.map(
            async (endpoint: string) =>
                await axios.get(endpoint).then(async (response: AxiosResponse) => {
                    const endRes = response.data.data;
                    const shop = 'CoinBase';
                    const short = endRes.base;
                    const price = endRes.amount;
                    const date = new Date().toLocaleDateString();
                    const time = new Date().toLocaleTimeString();
                    const coin = new Coin(shop, short, price, date, time);
                    await coin.save();
                })
        );
        Promise.all([...promise])
    } catch (err) {
        console.log((err as Error).message);
    }
};
export default endpoint;
