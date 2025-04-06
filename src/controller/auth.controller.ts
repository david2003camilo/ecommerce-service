import { Request, Response } from "express";

import { responseUtil } from "../helper/handlerResponse";
import { ResponseDTO } from "../entity/response/Response";
import { sign } from "../service/UserSevice";
import { loginSchema } from "../schemas/login.schema";

const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Validate request body using Zod schema
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      // Return 400 Bad Request if validation fails
      const response = responseUtil(
        400,
        "Invalid request format",
        result.error.errors
      );
      return res.status(response.status).json(response);
    }

    const { email, password } = result.data;

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
