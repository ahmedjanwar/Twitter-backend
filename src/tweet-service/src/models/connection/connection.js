const mariadb = require('mariadb');
require('dotenv').config();

const host_env = process.env.HOST;
const Uname = process.env.USER_NAME;
const Password = process.env.ROOT_PASSWORD;
const database = process.env.DATABASE_NAME;

async function asyncFunction() {
    let conn;
    try {
        // Create a new connection
        conn = await mariadb.createConnection({
            host: host_env,
            //port: '3306',
            user: Uname,
            password: Password,
            database: database,
        });

        // Print connection thread
        console.log(`Connected! (id=${conn.threadId})`);
    } catch (err) {
        // Print error
        console.log(err);
    } finally {
        // Close connection
        if (conn) await conn.close();
    }
}

asyncFunction();