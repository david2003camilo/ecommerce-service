import "reflect-metadata";

import app from "./app";
import { AppDataSource } from "./config/db";
import { env } from "./config/env";

async function main() {
  const port = env.PORT;
  console.log(env);
  await AppDataSource.initialize()
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.error("Database not connect", error);
    });
  app.listen(port);
}

main();
