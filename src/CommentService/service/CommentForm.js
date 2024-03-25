const { connect: connectMariaDB } = require('../connection/db');
const { connect: connectRabbitMQ } = require('../connection/rabbitMQ');

// Function to publish comment message to RabbitMQ
async function publishCommentMessage(commentText, userId, tweetId) {
    try {
        const channel = await connectRabbitMQ(); // Assuming connectRabbitMQ returns a channel
        const exchangeName = 'comment_exchange';

        await channel.assertExchange(exchangeName, 'direct', { durable: true });
        await channel.publish(exchangeName, '', Buffer.from(JSON.stringify({ commentText, userId, tweetId })));

        console.log('Comment message published to RabbitMQ:', { commentText, userId, tweetId });

        await channel.close();
    } catch (error) {
        console.error('Error publishing comment message to RabbitMQ:', error);
        throw error;
    }
}

// Function to save comment to MariaDB
async function saveCommentToDatabase(commentText, userId, tweetId) {
    try {
        const connection = await connectMariaDB(); // Assuming connectMariaDB returns a connection

        const [rows, fields] = await connection.execute('INSERT INTO comments (comment, userId, tweetId) VALUES (?, ?, ?)', [commentText, userId, tweetId]);

        console.log('Comment saved to MariaDB:', { commentText, userId, tweetId });

        await connection.end();
    } catch (error) {
        console.error('Error saving comment to MariaDB:', error);
        throw error;
    }
}


const commentText = 'This is a comment.';
const userId = 123;
const tweetId = 456;

(async () => {
    try {
        await publishCommentMessage(commentText, userId, tweetId);
        await saveCommentToDatabase(commentText, userId, tweetId);
    } catch (error) {
        console.error('Error:', error);
    }
})();
