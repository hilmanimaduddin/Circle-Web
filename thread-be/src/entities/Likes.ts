import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Thread } from "./Thread";
import { User } from "./Users";

@Entity({ name: "likes" })
export class Likes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.likes, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user: User[];

  @ManyToOne(() => Thread, (user) => user.id, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  thread: User[];
}
