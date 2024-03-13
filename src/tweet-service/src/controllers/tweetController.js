const Tweet = require('../models/query/db');
const { executeQuery } = require('../models/connection/connection');
const db = require("../models/query/db");

exports.createTweet = async (req, res) => {
  const { content } = req.body; 
  try {
    // Execute the SQL query to insert a new tweet
    const result = await pool.query("INSERT INTO tweets (content, authorid) VALUES (?, 111)", [content]);
    
    // Send a success response
    res.json({ message: 'Tweet added successfully' });
  } catch (err) {
    // Log and send error response if any
    console.error("Error creating tweet:", err);
    res.status(500).json({ error: 'An error occurred while creating the tweet' });
  } finally {
    // Close the database connection pool
    pool.end();
  }
};

exports.getAllTweets = async (req, res) => {
  try {
    // Use pool.query to get all contacts
    var rows = await db.pool.query("select * from tweets");

    // Print list of contacts
    for (i = 0, len = rows.length; i < len; i++) {
        console.log(`(id=${rows[i].id}) ${rows[i].content} ${rows[i].authorId} <${rows[i].createdAt}>`);
    }

    res.json(rows);
  } catch (err) {
      // Print errors
      console.log(err);
  } finally {
  db.pool.end();
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
