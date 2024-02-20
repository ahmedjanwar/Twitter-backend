const Tweet = require('../models/query/db');
const { executeQuery } = require('../models/connection/connection');
const db = require("../models/query/db");

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
