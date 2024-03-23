// rabbitmq.js
const amqp = require('amqplib');

class RabbitMQ {
  constructor(url) {
    this.url = url;
    this.connection = null;
    this.channel = null;
  }

  async connect() {
    this.connection = await amqp.connect(this.url);
    this.channel = await this.connection.createChannel();
  }

  async publish(exchange, routingKey, message) {
    await this.channel.assertExchange(exchange, 'direct', { durable: true });
    this.channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));
    console.log(`Message published to exchange '${exchange}' with routing key '${routingKey}':`, message);
  }

  async consume(queue, exchange, routingKey, callback) {
    await this.channel.assertExchange(exchange, 'direct', { durable: true });
    const q = await this.channel.assertQueue(queue, { durable: true });
    await this.channel.bindQueue(q.queue, exchange, routingKey);

    this.channel.consume(q.queue, (msg) => {
      if (msg !== null) {
        const message = JSON.parse(msg.content.toString());
        console.log(`Message received from exchange '${exchange}' with routing key '${routingKey}':`, message);
        callback(message);
        this.channel.ack(msg);
      }
    });
  }
}

module.exports = RabbitMQ;
