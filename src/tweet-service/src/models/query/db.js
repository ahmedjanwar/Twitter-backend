const mariadb = require('mariadb');
require('dotenv').config();

const host_env = process.env.HOST;
const Uname = process.env.USER_NAME;
const Password = process.env.ROOT_PASSWORD;
const database = process.env.DATABASE_NAME;

// Expose the Pool object within this module
module.exports = Object.freeze({
    pool: mariadb.createPool({
        host: host_env,
        //port: '3306',
        user: Uname,
        password: Password,
        database: database,
    })
});
