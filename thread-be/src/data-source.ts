import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/Users";
import { Thread } from "./entities/Thread";
import { Replies } from "./entities/Replies";
import { Likes } from "./entities/Likes";
import { Followers } from "./entities/Follows";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "containers-us-west-79.railway.app",
  port: 6099,
  username: "postgres",
  password: "1fQy5XtByhkIjxRe38TV",
  database: "railway",
  synchronize: true,
  logging: false,
  // entities: ["src/entities/*.ts"],
  entities: [User, Thread, Replies, Likes, Followers],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});
