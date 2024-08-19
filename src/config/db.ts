import { DataSource } from "typeorm";

import { env } from "../config/env";
import { Users } from "../entity/Users";
import { Categories } from "../entity/Categories";
import { Products } from "../entity/Products";
import { Photos } from "../entity/Photos";
import { Orders } from "../entity/Orders";
import { OrderDetails } from "../entity/OrderDetails";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.HOST,
  port: Number(env.PORTDB),
  username: env.USERNAME,
  password: env.PASSWORD,
  database: env.DATABASE,
  synchronize: true,
  logging: true,
  entities: [Users, Categories, Products, Photos, Orders, OrderDetails],
});
