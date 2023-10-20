import { Request, Response } from "express";
import FollowsService from "../services/FollowsService";

class FollowsController {
  async findFollower(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;

      const response = await FollowsService.findFollower(loginSession);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async findFollowed(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;

      const response = await FollowsService.findFollowed(loginSession);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async findFollowerUser(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;
      const UserId = parseInt(req.params.user);

      const response = await FollowsService.findFollowerUser(
        loginSession,
        UserId
      );
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async findFollowedUser(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;
      const UserId = parseInt(req.params.user);

      const response = await FollowsService.findFollowedUser(
        loginSession,
        UserId
      );
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async notFollowed(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;
      const response = await FollowsService.notFollowed(loginSession);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;

      const response = await FollowsService.create(req.body, loginSession);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;
      const followedUserId = parseInt(req.params.followed_user_id);

      const response = await FollowsService.delete(
        followedUserId,
        loginSession
      );
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new FollowsController();
