import "dotenv/config";
import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Thread } from "../entities/Thread";

class ThreadsService {
  private readonly threadRepository: Repository<Thread> =
    AppDataSource.getRepository(Thread);

  async find(reg: Request, res: Response) {
    try {
      const threads = await this.threadRepository.find({
        take: 20,
        relations: ["user", "replies", "likes"],
        order: {
          id: "DESC",
        },
      });

      let newResponse = [];

      threads.forEach((element) => {
        // element.image = "http://localhost:5000/uploads/" + element.image;
        newResponse.push({
          ...element,
          replies_count: element.replies.length,
          likes_count: element.likes.length,
        });
      });

      return res.status(200).json(newResponse);
    } catch (err) {
      return res.status(500).json({ error: "Error while getting threads" });
    }
  }

  async findByUser(reg: Request, res: Response) {
    const loginSession = res.locals.loginSession;
    try {
      const threads = await this.threadRepository.find({
        where: {
          user: {
            id: loginSession.user.id,
          },
        },
        take: 20,
        relations: ["user", "replies", "likes"],
        order: {
          id: "DESC",
        },
      });

      let newResponse = [];

      threads.forEach((element) => {
        // element.image = "http://localhost:5000/uploads/" + element.image;
        newResponse.push({
          ...element,
          replies_count: element.replies.length,
          likes_count: element.likes.length,
        });
      });

      return res.status(200).json(newResponse);
    } catch (err) {
      return res.status(500).json({ error: "Error while getting threads" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      // const filename = req.file ? req.file.filename : "";
      const filename = req.file ? req.file.path : "";
      // const filename = req.file.fieldname;
      const loginSession = res.locals.loginSession;

      console.log("req.file", req.file);

      // cloudinary.config({
      //   cloud_name: process.env.CLOUD_NAME,
      //   api_key: process.env.API_KEY,
      //   api_secret: process.env.API_SECRET,
      // });

      // let cloudinaryResponse = null;
      // if (req.file !== undefined) {
      //   cloudinaryResponse = await cloudinary.uploader.upload(
      //     "./uploads/" + filename
      //   );
      // }
      // console.log("cloud Res", cloudinaryResponse);

      const thread = this.threadRepository.create({
        content: data.content,
        user: {
          id: loginSession.user.id,
        },
      });

      if (req.file !== undefined) {
        thread.image = filename;
      }
      const createThread = this.threadRepository.save(thread);
      return res.status(200).json(createThread);
    } catch (err) {
      return res.status(500).json({ error: "sorry there was an error", err });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const threads = await this.threadRepository.findOne({
        relations: ["user", "replies", "likes"],
        where: {
          id: id,
        },
      });

      return res.status(200).json(threads);
    } catch (err) {
      return res.status(500).json({ error: "sorry there was an error" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const thread = await this.threadRepository.delete(id);
      return res.status(200).json(thread);
    } catch (err) {
      return res.status(500).json({ error: "sorry there was an error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const filename = req.file ? req.file.path : "";
      const thread = await this.threadRepository.findOne({
        where: {
          id: id,
        },
      });
      const data = req.body;

      if (filename != "") {
        thread.image = filename;
      }

      // if (data.image != "") {
      //   thread.image = data.image;
      // }
      if (data.content != "") {
        thread.content = data.content;
      }
      if (data.replies != "") {
        thread.replies = data.replies;
      }
      if (data.likes != "") {
        thread.likes = data.likes;
      }
      if (data.user != "") {
        thread.user = data.user;
      }

      const updateThread = this.threadRepository.save(thread);
      return res.status(200).json(updateThread);
    } catch (err) {
      return res.status(500).json({ error: "sorry there was an error" });
    }
  }
}

export default new ThreadsService();
