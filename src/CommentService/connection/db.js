const mysql = require('mysql2/promise');

// Create a connection pool
const pool = mysql.createPool({
    host: 'jdbc:mariadb://mariadb.vamk.fi/e2101089_java_tweet',
    user: 'e2101089',
    password: '6eKqwD7SJzs',
    database: 'e2101089_tweet'
});

module.exports = pool;
