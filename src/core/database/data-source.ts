import "reflect-metadata";

import { DataSource } from "typeorm";

import { ProjectEnv } from "../../../env";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: ProjectEnv.DATABASE_HOST,
  port: Number(ProjectEnv.DATABASE_PORT),
  username: ProjectEnv.DATABASE_USERNAME,
  password: ProjectEnv.DATABASE_PASSWORD,
  database: ProjectEnv.DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: [__dirname + "/../../**/*.entity.ts"],
  migrations: [],
  subscribers: [],
});
