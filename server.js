
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 5000;

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'your_username',
	password: 'your_password',
	database: 'commentsDB',
});

connection.connect((err) => {
	if(err) {
	console.error('Error connecting to MariDB:', err);
	return;

}

	console.log('Connected to MariaDB');
});

app.use(bodyParser.json());

app.listen(port, () => {
	console.log('Server is running on port ${port}');
});
