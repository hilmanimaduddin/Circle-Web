import "reflect-metadata";
import { DataSource } from "typeorm";
import { Thread } from "./entities/Thread";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 12345,
  username: "postgres",
  password: "123",
  database: "threads-be",
  synchronize: true,
  logging: false,
  entities: ["src/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});
