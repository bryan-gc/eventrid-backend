import { config } from "dotenv";

config();

export const ProjectEnv = {
  DATABASE_HOST: process.env.DATABASE_HOST as string,
  DATABASE_PORT: Number(process.env.DATABASE_PORT),
  DATABASE_USERNAME: process.env.DATABASE_USERNAME as string,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD as string,
  DATABASE_NAME: process.env.DATABASE_NAME as string,

  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY as string,
  JWT_EXPIRATION_TIME: Number(process.env.JWT_EXPIRATION_TIME),

  PORT: Number(process.env.PORT),
};
