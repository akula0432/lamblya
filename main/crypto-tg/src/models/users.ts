import db from '../utils/database';

const users = class Users {
    user: string;
    market: string;
    coin: string;
    date: string;
    constructor(user: string, coin: string, date: string, market: string) {
        this.user = user;
        this.coin = coin;
        this.date = date;
        this.market = market;
    }

    save() {
        return db.execute('INSERT INTO users (user, coin, date, market) VALUES (?, ?, ?, ?)', [this.user, this.coin, this.date, this.market]);
    }

    static find(user: string, coin: string, market: string) {
        return db.execute(`SELECT coin FROM users WHERE users.user = ? AND users.coin = ? AND users.market = ?`, [user, coin, market]);
    }

    static findAll(user: string) {
        return db.execute(`SELECT * FROM users WHERE users.user = ?`, [user]);
    }

    static delete(user: string, coin: string, market: string) {
        return db.execute(`DELETE FROM users WHERE users.user = ? AND users.coin = ? AND users.market = ?`, [user, coin, market]);
    }
};

export default users;
