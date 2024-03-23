const RabbitMQ = require('./rabbitmq'); 
const pool = require('./db'); 

const rabbitmq = new RabbitMQ('amqp://localhost'); 


const CommentSchema = {
    tweetId: {
        type: 'INT',
        allowNull: false
    },
    comment: {
        type: 'VARCHAR(255)',
        allowNull: false
    },
    creator: {
        type: 'INT',
        allowNull: false
    },
    time: {
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: 'CURRENT_TIMESTAMP'
    }
};

/
const Comment = {
    create: async function(commentData) {
        const { tweetId, comment, creator, time } = commentData;

        
        await rabbitmq.publish('comment', 'new_comment', { tweetId, comment, creator, time });

        
        const connection = await pool.getConnection();
        await connection.query('INSERT INTO comments (tweetId, comment, creator, time) VALUES (?, ?, ?, ?)', [tweetId, comment, creator, time]);
        connection.release();
    },
    
};

module.exports = Comment;


