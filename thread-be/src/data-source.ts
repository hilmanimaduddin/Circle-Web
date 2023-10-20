import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "containers-us-west-79.railway.app",
  port: 6099,
  username: "postgres",
  password: "1fQy5XtByhkIjxRe38TV",
  database: "railway",
  synchronize: true,
  logging: false,
  entities: ["src/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});
