import { Request, Response } from "express";
import UserServices from "../services/AuthService";

class AuthController {
  register(req: Request, res: Response) {
    UserServices.register(req, res);
  }

  find(req: Request, res: Response) {
    UserServices.find(req, res);
  }

  updateUser(req: Request, res: Response) {
    UserServices.updateUser(req, res);
  }

  updateProfile(req: Request, res: Response) {
    UserServices.updateProfile(req, res);
  }

  updateBackground(req: Request, res: Response) {
    UserServices.updateBackground(req, res);
  }

  login(req: Request, res: Response) {
    UserServices.login(req, res);
  }

  check(req: Request, res: Response) {
    UserServices.check(req, res);
  }
}

export default new AuthController();
