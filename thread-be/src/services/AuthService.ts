import bcrypt = require("bcrypt");
import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/Users";
import { userScema } from "../utils/validation";
import jwt = require("jsonwebtoken");

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
      return res.status(500).json({ error: err });
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

  async updateUser(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;

      const data = req.body;
      console.log("data", data);

      const user = await this.authRepository.findOne({
        where: {
          id: loginSession.user.id,
        },
      });

      if (data.username != "") {
        user.username = data.username;
      }
      if (data.replies != "") {
        user.replies = data.replies;
      }
      if (data.likes != "") {
        user.likes = data.likes;
      }
      if (data.email != "") {
        user.email = data.email;
      }
      if (data.full_name != "") {
        user.full_name = data.full_name;
      }
      if (data.profile_description != "") {
        user.profile_description = data.profile_description;
      }

      console.log("user", user);

      const updateUser = this.authRepository.save(user);
      console.log(updateUser);

      return res.status(200).json({ updateUser, value: "berhasil update" });
    } catch (err) {
      return res
        .status(500)
        .json({ error: "ada kesalahan saat update akun", err });
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;

      const filename = req.file ? req.file.path : "";
      const user = await this.authRepository.findOne({
        where: {
          id: loginSession.user.id,
        },
      });

      if (filename != "") {
        user.profile_picture = filename;
      }

      const updateUser = this.authRepository.save(user);
      return res.status(200).json({ updateUser, value: "berhasil update" });
    } catch (err) {
      return res
        .status(500)
        .json({ error: "ada kesalahan saat update akun", err });
    }
  }

  async updateBackground(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;

      const filename = req.file ? req.file.path : "";
      const user = await this.authRepository.findOne({
        where: {
          id: loginSession.user.id,
        },
      });

      if (filename != "") {
        user.profile_background = filename;
      }

      const updateUser = this.authRepository.save(user);
      return res.status(200).json({ updateUser, value: "berhasil update" });
    } catch (err) {
      return res
        .status(500)
        .json({ error: "ada kesalahan saat update akun", err });
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
          "profile_background",
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
        profile_background: checkEmail.profile_background,
        profile_description: checkEmail.profile_description,
      });

      const token = jwt.sign({ user }, "pastibisa", { expiresIn: "24h" });

      return res.status(200).json({
        user: user,
        token,
      });
    } catch (err) {
      return res.status(500).json({ error: err });
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
          "profile_background",
          "profile_description",
        ],
      });

      if (user.profile_picture == null) {
        user.profile_picture =
          "https://www.copaster.com/wp-content/uploads/2023/03/pp-kosong-wa-default-300x279.jpeg";
      }

      if (user.profile_background == null) {
        user.profile_background =
          "https://www.copaster.com/wp-content/uploads/2023/03/pp-kosong-wa-default-300x279.jpeg";
      }

      return res.status(200).json({
        user,
        message: "Token is valid",
      });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
}

export default new AuthServices();
