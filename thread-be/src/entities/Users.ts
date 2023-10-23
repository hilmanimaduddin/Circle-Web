import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Thread } from "./Thread";
import { Likes } from "./Likes";
import { Replies } from "./Replies";
import { Followers } from "./Follows";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  full_name: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  profile_picture: string;

  @Column({ nullable: true })
  profile_background: string;

  @Column({ nullable: true })
  profile_description: string;

  @OneToMany(() => Thread, (thread) => thread.user)
  threads: Thread[];

  @OneToMany(() => Likes, (likes) => likes.user)
  likes: Likes[];

  @OneToMany(() => Replies, (replies) => replies.user)
  replies: Replies[];

  @OneToMany(() => Followers, (follower) => follower.follower)
  follower: Followers[];

  @OneToMany(() => Followers, (followed) => followed.followed)
  followed: Followers[];
}
