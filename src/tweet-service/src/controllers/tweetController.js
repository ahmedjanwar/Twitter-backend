const Tweet = require('../models/tweet');

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
    const tweets = await Tweet.find();
    res.json(tweets);
  } catch (error) {
    console.error(error);
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
