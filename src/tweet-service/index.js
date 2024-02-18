const express = require('express');
const bodyParser = require('body-parser');
const tweetRoutes = require('./src/routes/tweetRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

// Routes
app.use('/tweets', tweetRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
