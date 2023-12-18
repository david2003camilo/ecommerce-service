import jwt from "jsonwebtoken";
import moment from "moment";

import { Users } from "../entity/Users";
import { env } from "../config/env";
import { ResponseDTO } from "../entity/response/Response";
import { responseUtil } from "./handlerResponse";

interface UserJwt {
  id: number;
  name: string;
  lastName: string;
  role: string;
  exp: Date;
}

const signJwt = (user: Users) => {
  const jwtSecret = env.SECRET ? env.SECRET : "";
  const token = jwt.sign(
    {
      id: user.id,
      name: user.firstName,
      lastName: user.lastName,
      role: user.role,
      exp: Date.now() + 60 * 100000,
    },
    jwtSecret
  );
  return token;
};

const verifyJwt = async (token: string, client?: boolean) => {
  try {
    const jwtSecret = env.SECRET ? env.SECRET : "";
    const decoded = jwt.verify(token, jwtSecret) as unknown as UserJwt;
  
    if (!decoded) {
      return responseUtil(401, "Not authorized", []);
    }
    if (moment().unix() > moment(decoded.exp).unix()) {
      return responseUtil(401, "Token expired", []);
    }
  
    if (!client && decoded != null) {
      const user = await Users.findOneBy({ id: decoded.id });
      if (user?.role != "ADMIN")
        return responseUtil(403, "unauthorized permission", []);
    }
  
    return responseUtil(200, "Accepted"); 
  } catch (error) {
    return responseUtil(401, "Not authorized", []);
  }
};

export { signJwt, verifyJwt };
