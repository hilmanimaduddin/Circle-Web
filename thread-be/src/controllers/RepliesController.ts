import { Request, Response } from "express";
import RepliesServices from "../services/RepliesService";

class RepliesController {
  async find(req: Request, res: Response) {
    try {
      const response = await RepliesServices.find(req.query);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  create(req: Request, res: Response) {
    RepliesServices.create(req, res);
  }
}

export default new RepliesController();
