import * as amqp from "amqplib";
import { Request, Response } from "express";

class QueueController {
  async enqueue(req: Request, res: Response) {
    try {
      const payload = {};

      const connection = await amqp.connect("amqp://localhost");
      const channel = await connection.createChannel();

      await channel.assertQueue("thread-queue");

      channel.sendToQueue("thread-queue", Buffer.from(JSON.stringify(payload)));
      await channel.close();
      await connection.close();

      res.status(200).json({
        message: "Thread is queued",
      });
    } catch (error) {
      console.error("Error enqueueing message:", error);
      res.status(500).json({
        error: "Something wrong in server!",
      });
    }
  }
}
