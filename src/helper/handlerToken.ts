import { Request } from "express";

const getToken = (req: Request) => {
  const headers = req.headers.authorization?.split(" ")[1];
  const token = headers ? headers : "";
  return token;
};

export { getToken };
