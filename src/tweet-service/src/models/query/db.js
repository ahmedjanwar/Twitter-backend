const mariadb = require('mariadb');
require('dotenv').config();

const host_env = process.env.HOST;
const Uname = process.env.USER_NAME;
const Password = process.env.ROOT_PASSWORD;
const database = process.env.DATABASE_NAME;

// Export a function that creates and returns the pool
module.exports = () => {
    return mariadb.createPool({
        host: host_env,
        user: Uname,
        password: Password,
        database: database,
    });
};
