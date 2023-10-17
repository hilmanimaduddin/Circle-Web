import { Repository } from "typeorm";
import { Likes } from "../entities/Likes";
import { AppDataSource } from "../data-source";

class LikesService {
  private readonly likeRepository: Repository<Likes> =
    AppDataSource.getRepository(Likes);

  async findOne(reqQuery: any): Promise<any> {
    try {
      const threadId = parseInt(reqQuery.thread_id ?? 0);
      const userId = parseInt(reqQuery.user_id ?? 0);
      const Replies = await this.likeRepository.find({
        relations: ["user", "thread"],
        where: {
          thread: {
            id: threadId,
          },
          user: {
            id: userId,
          },
        },
        order: {
          id: "DESC",
        },
      });
      return Replies;
    } catch (err) {
      throw new Error("Something error");
    }
  }

  async findByUser(UserId: any): Promise<any> {
    try {
      const Replies = await this.likeRepository.find({
        relations: ["user", "thread"],
        where: {
          user: {
            id: UserId,
          },
        },
        order: {
          id: "DESC",
        },
      });

      return Replies;
    } catch (err) {
      throw new Error("Something error");
    }
  }

  async create(reqBody: any, loginSession: any): Promise<any> {
    try {
      const isLikeExist = await this.likeRepository.count({
        where: {
          user: {
            id: loginSession.user.id,
          },
          thread: {
            id: reqBody.thread_id,
          },
        },
      });

      if (isLikeExist > 0) {
        throw new Error("You already like this thread!");
      }

      const like = this.likeRepository.create({
        thread: {
          id: reqBody.thread_id,
        },
        user: {
          id: loginSession.user.id,
        },
      });

      await this.likeRepository.save(like);
      console.log("tambah");

      return {
        message: "You liked this thread...",
        like: like,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async delete(threadId: number, loginSession: any): Promise<any> {
    try {
      const like = await this.likeRepository.findOne({
        where: {
          thread: {
            id: threadId,
          },
          user: {
            id: loginSession.user.id,
          },
        },
      });

      if (!like) {
        throw new Error("You didn't like this thread..");
      }

      await this.likeRepository.delete({
        id: like.id,
      });

      console.log("delete");

      return {
        message: "You unliked this thread..",
        like: like,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new LikesService();
