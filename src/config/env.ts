import * as dotenv from "dotenv";
dotenv.config();

export const env = Object.freeze({
  PORT: process.env.PORT || 3000,
  SECRET: process.env.SECRET || "",
  HOST: process.env.HOST || "localhost",
  USERNAME: process.env.USERNAMEDB || "",
  PASSWORD: process.env.PASSWORD || "",
  DATABASE: process.env.DATABASE || "ecommerce",
  PORTDB: process.env.PORTDB || 5432,
});
