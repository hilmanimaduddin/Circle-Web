import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Thread } from "./Thread";
import { User } from "./Users";

@Entity({ name: "replies" })
export class Replies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  posted_at: Date;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user: User;

  @ManyToOne(() => Thread, (thread) => thread.replies, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  thread: Thread;
}
