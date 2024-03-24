
const Tweet = require("../models/query/tweet");

exports.createTweet = async (req, res) => {
  try {
    const tweetId = await Tweet.create(content, authorId);
    // Convert tweetId to string before sending the response
    res.status(201).json({ id: tweetId.toString(), message: "Tweet created successfully" });
  } catch (error) {
    console.error("Error creating tweet:", error);
    res.status(500).json({ error: "An error occurred while creating the tweet" });
  }
};
exports.getTweet = async (req, res) => {
  const { tweetIds } = req.query; // Extract tweetIds from query parameters
  try {
    let tweets;
    if (tweetIds) {
      const tweetIdList = tweetIds.split(',').map(id => parseInt(id)); // Split and convert to array of integers
      tweets = await Tweet.getAll(tweetIdList); // Pass tweet ID array to getAll method
    } else {
      tweets = await Tweet.getAll(); // If no tweetIds specified, get all tweets
    }
    res.status(200).json({ tweets, message: "List of tweets" });
  } catch (error) {
    console.error("Error fetching tweets:", error);
    res.status(500).json({ error: "An error occurred while fetching the tweets" });
  }
};

exports.deleteTweet = async (req, res) => {
  const { tweetId } = req.params;
  try {
    const isDeleted = await Tweet.delete(tweetId);
    if (isDeleted) {
      res.json({ message: "Tweet deleted successfully" });
    } else {
      res.status(404).json({ error: "Tweet not found" });
    }
  } catch (error) {
    console.error("Error deleting tweet:", error);
    res.status(500).json({ error: "An error occurred while deleting the tweet" });
  }
};