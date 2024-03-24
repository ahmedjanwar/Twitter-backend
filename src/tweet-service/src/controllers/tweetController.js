
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