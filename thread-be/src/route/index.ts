import * as express from "express";
import { Request, Response } from "express";
import AuthController from "../controllers/AuthController";
import RepliesController from "../controllers/RepliesController";
import ThreadsController from "../controllers/ThreadsController";
import authenticate from "../middlewares/auth";
import { upload } from "../middlewares/uploadFile";
import ThreadsQueue from "../queues/ThreadsQueue";
import FollowsController from "../controllers/FollowsController";
import LikesController from "../controllers/LikesController";

const router = express.Router();

router.get("/", (reg: Request, res: Response) => {
  res.send("hello world v1!");
});

router.get("/thread", authenticate, ThreadsController.find);
// router.post(
//   "/thread/create",
//   authenticate,
//   upload("image"),
//   ThreadsQueue.create
// );
router.post(
  "/thread/create",
  authenticate,
  upload("image"),
  ThreadsController.create
);
router.get("/thread/:id", ThreadsController.findOne);
router.delete("/thread/delete/:id", ThreadsController.delete);
router.patch("/thread/update/:id", ThreadsController.update);

router.get("/auth/", AuthController.find);
router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);
router.get("/auth/check", authenticate, AuthController.check);

router.get("/replies", RepliesController.find);
router.post("/replies/create", authenticate, RepliesController.create);

router.get("/follows", authenticate, FollowsController.find);
router.post("/follow", authenticate, FollowsController.create);
router.delete(
  "/follow/:followed_user_id",
  authenticate,
  FollowsController.delete
);

router.get("/likeget", LikesController.find);
router.get("/like/:user", LikesController.findByUser);
router.post("/like", authenticate, LikesController.create);
router.delete("/like/:thread_id", authenticate, LikesController.delete);

export default router;
