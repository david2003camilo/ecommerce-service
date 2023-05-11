import { Request, Response } from "express";

import { responseUtil } from "../helper/handlerResponse";
import { ResponseDTO } from "../entity/response/Response";
import { sign } from "../service/UserSevice";

const login = async (req: Request, res: Response) => {
  let response: ResponseDTO;
  try {
    const { email, password } = req.body;
    const login = sign;

    response = await login(email, password);

    return res.status(response.status).json(response);
  } catch (error) {
    response = responseUtil(500, "Error internal", []);
    return res.status(response.status).json(response);
  }
};

export { login };
