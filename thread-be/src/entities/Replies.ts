import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Thread } from "./Thread";
import { User } from "./Users";

@Entity({ name: "replies" })
export class Replies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User[];

  @ManyToOne(() => Thread, (thread) => thread.replies)
  thread: Thread[];
}
