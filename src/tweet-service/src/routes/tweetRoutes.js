// tweetRoutes.js

const express = require("express");
const router = express.Router();
const tweetController = require("../controllers/tweetController");

// POST /tweets - Create a new tweet
router.post("/", tweetController.createTweet);

// GET /tweets/all - Get all tweets
router.get("/all", tweetController.getTweet);

// DELETE /tweets/:tweetId - Delete a tweet by ID
router.delete("/:tweetId", tweetController.deleteTweet);

module.exports = router;
