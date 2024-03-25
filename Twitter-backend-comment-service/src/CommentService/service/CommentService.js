const RabbitMQ = require('./rabbitmq'); // Import the RabbitMQ module
const pool = require('./db'); // Import the MariaDB connection pool

const rabbitmq = new RabbitMQ('amqp://localhost'); // Replace with your RabbitMQ connection URL

class CommentService {
    async addComment(commentText, userId, tweetId) {
        try {
            // Interact with MariaDB - insert comment into database
            const connection = await pool.getConnection();
            await connection.execute('INSERT INTO comments (comment, userId, tweetId) VALUES (?, ?, ?)', [commentText, userId, tweetId]);
            connection.release();
            
            // Publish comment message to RabbitMQ
            await rabbitmq.publish('comment', 'new_comment', { commentText, userId, tweetId });

            return { success: true }; // Return success response
        } catch (error) {
            console.error('Error adding comment:', error);
            throw error;
        }
    }
}

module.exports = CommentService;

