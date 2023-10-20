import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/Users";
import { userScema } from "../utils/validation";

class AuthServices {
  private readonly authRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async find(reg: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;
      const users = await this.authRepository.find({
        relations: ["follower", "followed"],
        // where: {
        //   id: loginSession.user.id,
        // },
        order: {
          id: "DESC",
        },
      });

      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json({ error: "kok gk ada user?" });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const data = req.body;

      const { error, value } = userScema.validate(data);
      if (error) {
        return res.status(400).json({ error: error.message });
      }

      const checkEmail = await this.authRepository.count({
        where: {
          email: value.email,
          username: value.username,
        },
      });

      if (checkEmail > 0) {
        return res.status(400).json({ error: "anda sudah terdaftar" });
      }

      const hashPassword = await bcrypt.hash(value.password, 10);

      const users = this.authRepository.create({
        username: data.username,
        full_name: data.full_name,
        email: data.email,
        profile_picture: data.profile_picture,
        profile_description: data.profile_description,
        password: hashPassword,
      });

      const createUser = this.authRepository.save(users);
      return res.status(200).json({
        createUser,
        value: "selamat anda sudah terdaftar",
      });
    } catch (err) {
      return res.status(500).json({ error: "ada kesalahan saat membuat akun" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const data = req.body;

      const checkEmail = await this.authRepository.findOne({
        where: {
          username: data.username,
          email: data.email,
        },
        select: [
          "id",
          "full_name",
          "username",
          "email",
          "password",
          "profile_picture",
          "profile_description",
        ],
      });

      if (!checkEmail) {
        return res.status(400).json({ error: "email / password salah" });
      }

      const hashPass = await bcrypt.compare(data.password, checkEmail.password);

      if (!hashPass) {
        return res.status(400).json({ pesan: "salah pasword" });
      }

      const user = this.authRepository.create({
        id: checkEmail.id,
        full_name: checkEmail.full_name,
        username: checkEmail.username,
        email: checkEmail.email,
        profile_picture: checkEmail.profile_picture,
        profile_description: checkEmail.profile_description,
      });

      const token = jwt.sign({ user }, "pastibisa", { expiresIn: "24h" });

      return res.status(200).json({
        user: user,
        token,
      });
    } catch (err) {
      return res.status(500).json({ error: "sorry there was an error" });
    }
  }

  async check(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;

      const user = await this.authRepository.findOne({
        where: {
          id: loginSession.user.id,
        },
        select: [
          "id",
          "full_name",
          "username",
          "email",
          "password",
          "profile_picture",
          "profile_description",
        ],
      });

      if (user.profile_picture == null) {
        user.profile_picture =
          "https://www.copaster.com/wp-content/uploads/2023/03/pp-kosong-wa-default-300x279.jpeg";
      }

      return res.status(200).json({
        user,
        message: "Token is valid",
      });
    } catch (err) {
      return res.status(500).json({ error: "sorry there was an error" });
    }
  }
}

export default new AuthServices();
