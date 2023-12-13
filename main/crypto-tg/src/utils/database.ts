import mysql from 'mysql2';
import { DATA_SOURCES } from '../config/config';
const dataSource = DATA_SOURCES.mysql;

const initDB = mysql.createPool({
    host: dataSource.host,
    user: dataSource.user,
    database: dataSource.database,
    password: dataSource.password,
});

export default initDB.promise();
