import * as dotenv from "dotenv";
dotenv.config();

export const env = Object.freeze({
  PORT: process.env.NODE_LOCAL_PORT || 3000,
  SECRET: process.env.JWT_SECRET || "",
  HOST: process.env.POSTGRES_HOST || "localhost",
  USERNAME: process.env.POSTGRES_USERNAMEDB || "",
  PASSWORD: process.env.POSTGRES_PASSWORD || "",
  DATABASE: process.env.POSTGRES_DATABASE || "ecommerce",
  PORTDB: process.env.POSTGRES_PORTDB || 5432,
});
