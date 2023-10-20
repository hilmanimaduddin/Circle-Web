import { Repository } from "typeorm";
import { Followers } from "../entities/Follows";
import { AppDataSource } from "../data-source";
import { User } from "../entities/Users";

class FollowsService {
  private readonly followRepository: Repository<Followers> =
    AppDataSource.getRepository(Followers);

  private readonly userRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async findFollower(loginSession: any): Promise<any> {
    try {
      const follows = await this.followRepository.find({
        relations: ["follower"],
        where: {
          followed: {
            id: loginSession.user.id,
          },
        },
      });

      const userFollowed = follows.map((follow) => follow.follower);
      const getUser = userFollowed.filter(
        (user) => user.id !== loginSession.user.id
      );

      return getUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findFollowed(loginSession: any): Promise<any> {
    try {
      const follows = await this.followRepository.find({
        relations: ["followed"],
        where: {
          follower: {
            id: loginSession.user.id,
          },
        },
      });

      const userFollowed = follows.map((follow) => follow.followed);
      const getUser = userFollowed.filter(
        (user) => user.id !== loginSession.user.id
      );

      return getUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findFollowerUser(loginSession: any, UserId: number): Promise<any> {
    try {
      const follows = await this.followRepository.findOne({
        relations: ["followed", "follower"],
        where: {
          followed: {
            id: loginSession.user.id,
          },
          follower: {
            id: UserId,
          },
        },
      });

      return follows;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findFollowedUser(loginSession: any, UserId: number): Promise<any> {
    try {
      const follows = await this.followRepository.findOne({
        relations: ["followed", "follower"],
        where: {
          follower: {
            id: loginSession.user.id,
          },
          followed: {
            id: UserId,
          },
        },
      });

      return follows;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async notFollowed(loginSession: any): Promise<any> {
    try {
      const user = await this.userRepository.find({
        take: 20,
      });
      const follows = await this.followRepository.find({
        relations: ["followed"],
        where: {
          follower: {
            id: loginSession.user.id,
          },
        },
      });
      const userFollowed = follows.map((follow) => follow.followed);
      const getUser = user.filter((user) => user.id !== loginSession.user.id);
      const notFollowed = getUser.filter((user) =>
        userFollowed.every((item) => item.id !== user.id)
      );
      return notFollowed;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // async find(
  //   loginSession: any,
  //   queryType?: string,
  //   queryLimit?: number
  // ): Promise<any> {
  //   try {
  //     let follows: Followers[];

  //     if (queryType === "following") {
  //       follows = await this.followRepository.find({
  //         take: queryLimit,
  //         where: {
  //           follower: {
  //             id: loginSession.user.id,
  //           },
  //         },
  //         relations: ["followed", "follower"],
  //       });

  //       return follows.map((follow) => ({
  //         id: follow.id,
  //         user_id: follow.followed.id,
  //         username: follow.followed.username,
  //         full_name: follow.followed.full_name,
  //         email: follow.followed.email,
  //         picture: follow.followed.profile_picture,
  //         description: follow.followed.profile_description,
  //         is_followed: true,
  //       }));
  //     } else if (queryType === "follower") {
  //       follows = await this.followRepository.find({
  //         take: queryLimit,
  //         where: {
  //           followed: {
  //             id: loginSession.user.id,
  //           },
  //         },
  //         relations: ["followed", "follower"],
  //       });

  //       return await Promise.all(
  //         follows.map(async (follow) => {
  //           const isFollowed = await this.followRepository.count({
  //             where: {
  //               follower: {
  //                 id: loginSession.user.id,
  //               },
  //               followed: {
  //                 id: follow.follower.id,
  //               },
  //             },
  //           });
  //           return {
  //             id: follow.id,
  //             user_id: follow.follower.id,
  //             username: follow.follower.username,
  //             full_name: follow.follower.full_name,
  //             email: follow.follower.profile_picture,
  //             description: follow.follower.profile_description,
  //             is_followed: isFollowed > 0,
  //           };
  //         })
  //       );
  //     }

  //     return {
  //       message: `Please specify valid query "type" (followers / followings)`,
  //     };
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // }

  async create(reqBody: any, loginSession: any): Promise<any> {
    try {
      const isFollowExixt = await this.followRepository.count({
        where: {
          follower: {
            id: loginSession.user.id,
          },
          followed: {
            id: reqBody.followed_user_id,
          },
        },
      });

      if (isFollowExixt > 0) {
        throw new Error("You already follow this user...");
      }

      if (reqBody.followed_user_id === loginSession.user.id) {
        throw new Error("You can't follow yourself...");
      }

      const isUserExist = await this.userRepository.count({
        where: {
          id: reqBody.followed_user_id,
        },
      });

      if (isUserExist <= 0) {
        throw new Error("This user doesn't exist...");
      }

      const follow = this.followRepository.create({
        follower: {
          id: loginSession.user.id,
        },
        followed: {
          id: reqBody.followed_user_id,
        },
      });

      await this.followRepository.save(follow);

      return {
        message: "You follow this user..",
        follow: follow,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async delete(followerUserId: number, loginSession: any): Promise<any> {
    try {
      const follow = await this.followRepository.findOne({
        where: {
          follower: {
            id: loginSession.user.id,
          },
          followed: {
            id: followerUserId,
          },
        },
      });

      if (!follow) {
        throw new Error("You did't follow this user...");
      }

      await this.followRepository.delete({
        id: follow.id,
      });

      return {
        message: "You unfollow this uder...",
        follow: follow,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new FollowsService();
