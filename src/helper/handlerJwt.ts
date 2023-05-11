import jwt from "jsonwebtoken";

import { Users } from "../entity/Users";
import { env } from "../config/env";
import { ResponseDTO } from "../entity/response/Response";
import { responseUtil } from "./handlerResponse";

const signJwt = (user: Users) => {
  const key = env.SECRET ? env.SECRET : "";
  const token = jwt.sign(
    {
      name: user.firstName,
      lastName: user.lastName,
      role: user.role,
      exp: Date.now() + 60 * 100000,
    },
    key
  );
  return token;
};

const verifyJwt = (token: string, client?: boolean) => {
  const key = env.SECRET ? env.SECRET : "";
  let response: ResponseDTO = new ResponseDTO();
  jwt.verify(token, key, (error: any, user: any) => {
    if (error) {
      return (response = responseUtil(403, "Not authorized", []));
    }
    if (Date.now() > user.exp) {
      return (response = responseUtil(403, "Token expired", []));
    }

    if (client && user.role != "ADMIN") {
      return (response = responseUtil(403, "Not authorized", []));
    }

    response = responseUtil(200, "Accepted", user);
  });
  return response;
};

export { signJwt, verifyJwt };
