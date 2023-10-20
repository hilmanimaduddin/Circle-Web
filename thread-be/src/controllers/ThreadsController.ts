import { Request, Response } from "express";
import ThreadsService from "../services/ThreadService";

class ThreadsController {
  find(req: Request, res: Response) {
    ThreadsService.find(req, res);
  }
  findByUser(req: Request, res: Response) {
    ThreadsService.findByUser(req, res);
  }

  create(req: Request, res: Response) {
    ThreadsService.create(req, res);
  }

  findOne(req: Request, res: Response) {
    ThreadsService.findOne(req, res);
  }

  delete(req: Request, res: Response) {
    ThreadsService.delete(req, res);
  }

  update(req: Request, res: Response) {
    ThreadsService.update(req, res);
  }
}

export default new ThreadsController();
