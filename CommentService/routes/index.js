const express = require('express');
const router = express.Router();
const RabbitMQ = require('./rabbitmq'); // Import RabbitMQ module
const rabbitmq = new RabbitMQ('amqp://localhost'); // Replace with your RabbitMQ connection URL
const pool = require('./db'); 

module.exports = (params) => {
    const { CommentService } = params;

    router.post('/', async (req, res, next) => {
        const { comment, userId, tweetId } = req.body;
        try {
            // Insert comment into MariaDB
            const connection = await pool.getConnection();
            await connection.execute('INSERT INTO comments (comment, userId, tweetId) VALUES (?, ?, ?)', [comment, userId, tweetId]);
            connection.release();
            
            // Publish comment message to RabbitMQ
            await rabbitmq.publish('comment', 'new_comment', { comment, userId, tweetId });
            
            return res.json({ success: true });
        } catch (err) {
            console.error('Error saving comment:', err);
            return res.status(500).json({ error: 'Failed to save comment' });
        }
    });

    return router;
};
