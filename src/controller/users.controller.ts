import { Request, Response } from "express";

import { Users } from "../entity/Users";
import { ResponseDTO } from "../entity/response/Response";

import { createUser, updateUsers } from "../service/UserSevice";
import { responseUtil } from "../helper/handlerResponse";
import { userCreateSchema } from "../schemas/user.schema";

const registerUser = async (req: Request, res: Response) => {
  let response: ResponseDTO;
  try {
    /* RETURN THE PROMISE */
    return createUser(req.body as Users)
      .then((users) => {
        response = responseUtil(200, "User created", [users]);
        return res.status(response.status).json(response);
      })
      .catch((error) => {
        console.log(error);
        response = responseUtil(500, "Error not save user", null);
        return res.status(response.status).json(response);
      });
  } catch (error) {
    response = responseUtil(500, "Error internal", []);
    return res.status(response.status).json(response);
  }
};

const updateUser = async (req: Request, res: Response) => {
  let response: ResponseDTO;
  try {
    const { email } = req.params;

    // Validate request body using Zod schema
    const result = userCreateSchema.safeParse(req.body);

    if (!result.success) {
      // Return 400 Bad Request if validation fails
      const response = responseUtil(
        400,
        "Invalid request format",
        result.error.errors
      );
      return res.status(response.status).json(response);
    }

    response = await updateUsers(email, req.body as Users);

    return res.status(response.status).json(response);
  } catch (error) {
    response = responseUtil(500, "Error internal", [error]);
    return res.status(response.status).json(response);
  }
};

export { registerUser, updateUser };
