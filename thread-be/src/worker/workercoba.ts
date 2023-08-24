import * as amqp from "amqplib";

async function processQueue() {
  try {
    const connection = await amqp.connect("amqp://localhost");

    const channel = await connection.createChannel();

    await channel.assertQueue("thread-queue");

    await channel.consume("thread-queue", (message) => {
      if (message !== null) {
        const payload = JSON.parse(message.content.toString());
        console.log("Received message :", payload);

        channel.ack(message);
      }
    });
  } catch (error) {
    console.error("Error prosessing queue :", error);
  }
}
