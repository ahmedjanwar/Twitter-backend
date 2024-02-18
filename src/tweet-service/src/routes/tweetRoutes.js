const express = require('express');
const router = express.Router();
const tweetController = require('../controllers/tweetController');

// POST /tweets - Create a new tweet
router.post('/', tweetController.createTweet);

// GET /tweets - Get all tweets
router.get('/', tweetController.getAllTweets);

// DELETE /tweets/:tweetId - Delete a tweet by ID
router.delete('/:tweetId', tweetController.deleteTweet);

module.exports = router;
