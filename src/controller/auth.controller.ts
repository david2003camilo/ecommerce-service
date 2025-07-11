import { Request, Response } from "express";

import { responseUtil } from "../helper/handlerResponse";
import { ResponseDTO } from "../entity/response/Response";
import { sign } from "../service/UserSevice";

const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    // Proceed with login logic check credentials y generate token
    const response: ResponseDTO = await sign(email, password);

    return res.status(response.status).json(response);
  } catch (error) {
    console.error("Login error:", error);

    const response = responseUtil(500, "Internal server error", []);
    return res.status(response.status).json(response);
  }
};

export { login };
