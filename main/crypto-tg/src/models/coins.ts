import db from '../utils/database';

const coins = class Coins {
    shop: string;
    short: string;
    price: number;
    date: string;
    time: string;
    constructor(shop: string, short: string, price: number, date: string, time: string) {
        this.shop = shop;
        this.short = short;
        this.price = price;
        this.date = date;
        this.time = time;
    }

    save() {
        return db.execute('INSERT INTO coins (shop, short, price, date, time) VALUES (?, ?, ?, ?, ?)', [
            this.shop,
            this.short,
            this.price,
            this.date,
            this.time,
        ]);
    }

    static find(market: string, short: string) {
        let date = new Date().toLocaleDateString();
        return db.execute(`SELECT * FROM coins WHERE coins1.shop = ? AND coins.short = ? AND coins.date = '${date}'`, [market, short]);
    }

    static findAll(market: string) {
        let date = new Date().toLocaleDateString();
        return db.execute(`SELECT * FROM coins WHERE coins.shop = ? AND coins.date = '${date}'`, [market]);
    }

    static findByTime(market: string, short: string) {
        let date = new Date().toLocaleDateString();
        return db.execute(`SELECT coins.price FROM coins WHERE coins.shop = ? AND coins.short = ? AND coins.date = '${date}'`, [market, short]);
    }
};

export default coins;
