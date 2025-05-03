const amqp = require('amqplib/callback_api');

exports.publishProductEvent = (event) => {
  amqp.connect('amqp://localhost', (err, connection) => {
    if (err) {
      console.error('Error connecting to RabbitMQ:', err);
      return;
    }

    connection.createChannel((err, channel) => {
      if (err) {
        console.error('Error creating channel:', err);
        return;
      }

      const queue = 'productEvents';
      const msg = JSON.stringify(event);

      channel.assertQueue(queue, { durable: true });
      channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });
      console.log('Published event:', event);
    });
  });
};
