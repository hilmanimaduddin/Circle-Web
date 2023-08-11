import * as express from "express";
import { Request, Response } from "express";
import ThreadsController from "../controllers/ThreadsController";
import UsersController from "../controllers/UsersController";

const router = express.Router();

router.get("/", (reg: Request, res: Response) => {
  res.send("hello world v1!");
});

router.get("/thread", ThreadsController.find);
router.post("/thread/create", ThreadsController.create);
router.get("/thread/:id", ThreadsController.findOne);
router.delete("/thread/delete/:id", ThreadsController.delete);
router.patch("/thread/update/:id", ThreadsController.update);

router.get("/user", UsersController.find);
router.post("/user/create", UsersController.create);
router.get("/user/:id", UsersController.findOne);
router.delete("/user/delete/:id", UsersController.delete);
router.patch("/user/update/:id", UsersController.update);

// router.get("/threads", (reg: Request, res: Response) => {
//   res.status(200).json({
//     message: "hello this is threads!",
//   });
// });

export default router;
