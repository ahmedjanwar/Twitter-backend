const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Import functions from the utility script
const { publishCommentMessage, saveCommentToDatabase } = require('./path/to/utility/script');

// Middleware
app.use(express.json()); // Parse JSON requests

// Example route to handle comment submission
app.post('/comments', async (req, res) => {
    const { commentText, userId, tweetId } = req.body;
    try {
        await publishCommentMessage(commentText, userId, tweetId);
        await saveCommentToDatabase(commentText, userId, tweetId);
        res.json({ success: true });
    } catch (error) {
        console.error('Error handling comment submission:', error);
        res.status(500).json({ error: 'Failed to handle comment submission' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});