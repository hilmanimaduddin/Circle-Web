import { Request, Response } from "express";
import { sendMessageToQueue } from "../libs/rabbitmq";

class ThreadQueue {
  async create(req: Request, res: Response) {
    try {
      const queueName = "threads-queue";
      const filename = res.locals.filename;

      const data = {
        content: req.body.content,
        image: filename,
      };

      const loginSession = res.locals.loginSession;

      const payload = {
        content: data.content,
        image: data.image,
        user_id: loginSession.user.id,
      };

      const errorQueue = await sendMessageToQueue(queueName, payload);

      if (errorQueue) {
        return res.status(500).json({
          error: errorQueue,
        });
      }

      res.status(200).json({
        message: "Thread is queued..",
        data: payload,
      });
    } catch (err) {
      console.log("Queue error..", err);
      res.status(500).json({
        error: "Something wrong in server...",
      });
    }
  }
}

export default new ThreadQueue();
