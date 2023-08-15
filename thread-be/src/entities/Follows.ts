import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./Users";

@Entity({ name: "followers" })
export class Followers {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.follower)
  follower: User;

  @ManyToOne(() => User, (user) => user.followed)
  followed: User;
}
