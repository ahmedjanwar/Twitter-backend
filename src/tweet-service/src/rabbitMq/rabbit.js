const amqp = require('amqplib/callback_api');

// Connect to RabbitMQ
amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }

    // Create a channel
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        const queue = 'tweetQueue';

        // Declare a queue
        channel.assertQueue(queue, {
            durable: false
        });

        // Send a message to the queue
        const message = 'New tweet: Hello, world!';
        channel.sendToQueue(queue, Buffer.from(message));
        console.log(" [x] Sent '%s'", message);

        // Close the connection and exit
        setTimeout(function() {
            connection.close();
            process.exit(0);
        }, 500);
    });
});
