const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: '<username>',
  password: '<password>',
  database: 'twitter_db',
});

module.exports = connection;
