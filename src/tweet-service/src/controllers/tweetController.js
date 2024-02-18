const Tweet = require('../models/query/db');
const { executeQuery } = require('../models/connection/connection');

exports.createTweet = async (req, res) => {
  try {
    const { content, authorId } = req.body;
    const tweet = await Tweet.create({ content, authorId });
    res.status(201).json(tweet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllTweets = async (req, res) => {
  try {
    const pool = createPool(); // Create the connection pool
    const conn = await pool.getConnection(); // Get a connection from the pool
    const rows = await conn.query("SELECT * FROM tweets"); // Execute query
    console.log("Tweets:", rows);
    conn.release(); // Release the connection back to the pool
    pool.end(); // Close the pool

    res.json(rows); // Send the fetched tweets as JSON response
  } catch (err) {
    console.error("Error fetching tweets:", err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteTweet = async (req, res) => {
  try {
    const { tweetId } = req.params;
    await Tweet.findByIdAndDelete(tweetId);
    res.json({ message: 'Tweet deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
