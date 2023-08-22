import * as express from "express";
import { Request, Response } from "express";
import AuthController from "../controllers/AuthController";
import RepliesController from "../controllers/RepliesController";
import ThreadsController from "../controllers/ThreadsController";
import authenticate from "../middlewares/auth";
import { upload } from "../middlewares/uploadFile";
// import multer = require("multer");
// import cloudinary from 'cloudinary';

const router = express.Router();
// const uploada = multer();
// const cloudinaryy = cloudinary();

router.get("/", (reg: Request, res: Response) => {
  res.send("hello world v1!");
});

router.get("/thread", authenticate, ThreadsController.find);
router.post(
  "/thread/create",
  authenticate,
  upload("image"),
  ThreadsController.create
);
router.get("/thread/:id", ThreadsController.findOne);
router.delete("/thread/delete/:id", ThreadsController.delete);
router.patch("/thread/update/:id", ThreadsController.update);

router.get("/auth", authenticate, AuthController.find);
router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);
router.get("/auth/check", authenticate, AuthController.check);

router.get("/replies", RepliesController.find);
router.post("/replies/create", authenticate, RepliesController.create);

export default router;
