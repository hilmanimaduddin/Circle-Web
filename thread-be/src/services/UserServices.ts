import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Thread } from "../entities/Thread";
import { Request, Response } from "express";
import { User } from "../entities/Users";

class UserServices {
  private readonly userRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async find(reg: Request, res: Response) {
    try {
      const users = await this.userRepository.find();

      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json({ error: "Error while getting user" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const users = this.userRepository.create({
        username: data.username,
        full_name: data.full_name,
        email: data.email,
        password: data.password,
        profile_picture: data.profile_picture,
        profile_description: data.profile_description,
      });
      const createUser = this.userRepository.save(users);
      return res.status(200).json(createUser);
    } catch (err) {
      return res.status(500).json({ error: "sorry there was an error" });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const user = await this.userRepository.findOne({
        where: {
          id: id,
        },
      });
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ error: "sorry there was an error" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const user = await this.userRepository.delete(id);
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ error: "sorry there was an error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const user = await this.userRepository.findOne({
        where: {
          id: id,
        },
      });
      const data = req.body;

      if (data.username != "") {
        user.username = data.username;
      }
      if (data.full_name != "") {
        user.full_name = data.full_name;
      }
      if (data.email != "") {
        user.email = data.email;
      }
      if (data.password != "") {
        user.password = data.password;
      }
      if (data.profile_picture != "") {
        user.profile_picture = data.profile_picture;
      }
      if (data.profile_description != "") {
        user.profile_description = data.profile_description;
      }

      const updateThread = this.userRepository.save(user);
      return res.status(200).json(updateThread);
    } catch (err) {
      return res.status(500).json({ error: "sorry there was an error" });
    }
  }
}

export default new UserServices();
