import { DataSource } from "typeorm";

import { env } from "../config/env";
import { Users } from "../entity/Users";
import { Categories } from "../entity/Categories";
import { Products } from "../entity/Products";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.HOST,
  port: Number(env.PORTDB),
  username: env.USERNAME,
  password: env.PASSWORD,
  database: env.DATABASE,
  synchronize: true,
  logging: true,
  entities: [Users, Categories, Products],
});
