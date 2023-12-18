import { Request, Response } from "express";

import { Users } from "../entity/Users";
import { ResponseDTO } from "../entity/response/Response";

import { createUser, updateUsers } from "../service/UserSevice";
import { responseUtil } from "../helper/handlerResponse";

const registerUser = async (req: Request, res: Response) => {
  let response: ResponseDTO;
  try {
    const { firstName, lastName, email, password } = req.body;

    const user = new Users();
    /* BUILD DATA FOR SAVE */
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;

    /* INSTANCE OF PROCESS */
    const process = createUser;

    /* RETURN THE PROMISE */
    return process(user)
      .then((users) => {
        response = responseUtil(200, "User created", [users]);
        return res.status(response.status).json(response);
      })
      .catch(() => {
        response.message = "Error not save user";
        response.status = 500;
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
    const body = req.body;
    response = await updateUsers(email, body);

    return res.status(response.status).json(response);
  } catch (error) {
    response = responseUtil(500, "Error internal", [error]);
    return res.status(response.status).json(response);
  }
};

export { registerUser, updateUser };
