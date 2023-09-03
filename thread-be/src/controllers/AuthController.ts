import { Request, Response } from "express";
import UserServices from "../services/AuthService";

class AuthController {
  register(req: Request, res: Response) {
    UserServices.register(req, res);
  }

  find(req: Request, res: Response) {
    UserServices.find(req, res);
  }

  login(req: Request, res: Response) {
    UserServices.login(req, res);
  }

  check(req: Request, res: Response) {
    UserServices.check(req, res);
  }
}

export default new AuthController();
