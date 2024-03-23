const mysql = require('mysql2/promise');

// Create a connection pool
const pool = mysql.createPool({
    host: 'your_database_host',
    user: 'your_database_user',
    password: 'your_database_password',
    database: 'your_database_name'
});

module.exports = pool;
