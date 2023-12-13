import cron from 'node-cron';

import CoinMarketCap from '../endpoints/coinMarketCap';
import CoinBase from '../endpoints/coinBase';
import CoinStats from '../endpoints/coinStats';
import kuCoin from '../endpoints/kucoin';
import CoinPaprika from '../endpoints/coinPaprika';

const getEnpoints = () => {
    const task = cron.schedule('*/5 * * * *', () => {
        try {
            CoinBase();
            CoinMarketCap();
            CoinPaprika();
            CoinStats();
            kuCoin();
            console.log(`Saved! ${new Date().toLocaleTimeString()}`);
        } catch (err) {
            console.log((err as Error).message);
        }
    });
    task.start();
};

export default getEnpoints;
