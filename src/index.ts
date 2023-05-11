import "reflect-metadata";

import app from "./app";
import { AppDataSource } from "./config/db";
import { env } from "./config/env";

async function main() {
  const port = env.PORT;
  await AppDataSource.initialize()
    .then(() => {
      console.log("Database connected");
    })
    .catch(() => {
      console.error("Database not connect");
    });
  app.listen(port);
}

main();
