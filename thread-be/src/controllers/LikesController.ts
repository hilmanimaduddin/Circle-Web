import { Request, Response } from "express";
import LikesServices from "../services/LikesService";

class LikesController {
  async find(req: Request, res: Response) {
    try {
      const response = await LikesServices.findOne(req.query);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async findByUser(req: Request, res: Response) {
    try {
      const UserId = parseInt(req.params.user);
      const response = await LikesServices.findByUser(UserId);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;

      const response = await LikesServices.create(req.body, loginSession);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;
      const threadId = parseInt(req.params.thread_id);

      const response = await LikesServices.delete(threadId, loginSession);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new LikesController();
