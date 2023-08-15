import * as express from "express";
import { Request, Response } from "express";
import AuthController from "../controllers/AuthController";
import ThreadsController from "../controllers/ThreadsController";
import authenticate from "../middlewares/auth";
import { upload } from "../middlewares/uploadFile";

const router = express.Router();

router.get("/", (reg: Request, res: Response) => {
  res.send("hello world v1!");
});

router.get("/thread", authenticate, ThreadsController.find);
router.post("/thread/create", upload, ThreadsController.create);
router.get("/thread/:id", authenticate, ThreadsController.findOne);
router.delete("/thread/delete/:id", ThreadsController.delete);
router.patch("/thread/update/:id", ThreadsController.update);

router.get("/auth/", AuthController.find);
router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);
router.get("/auth/check", authenticate, AuthController.check);

// router.get("/threads", (reg: Request, res: Response) => {
//   res.status(200).json({
//     message: "hello this is threads!",
//   });
// });

export default router;
