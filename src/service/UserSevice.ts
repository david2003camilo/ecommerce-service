import { Users } from "../entity/Users";
import { compare, encrypt } from "../helper/handlerBcryptjs";
import { signJwt } from "../helper/handlerJwt";
import { responseUtil } from "../helper/handlerResponse";

/* TODO: Add repository for consult */

const createUser = async (user: Users) => {
  /* ENCRYPTED PASSWORD */
  const passwordHash = await encrypt(user.password);
  user.password = passwordHash;

  /* SAVING USER */
  const isSave = user.save();
  return isSave;
};

const updateUsers = async (email: string, body: any) => {
  const user = Users.findOneBy({ email: email });
  if (!user) {
    return responseUtil(404, "Not found user", []);
  }

  const data = {
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
  };

  await Users.update({ email: email }, data);

  return responseUtil(204, "User update", []);
};

const sign = async (email: string, password: string) => {
  /*Get  user for email */
  const user = await Users.findOneBy({ email: email });

  if (!user) {
    return responseUtil(404, "Not found user", []);
  }

  /*Check the password */
  const checkPassword = await compare(password, user.password);

  if (!checkPassword) {
    return responseUtil(401, "Not authorized", []);
  }
  /*Generating token */
  const token = signJwt(user);

  if (!token) {
    return responseUtil(500, "Internal error", []);
  }

  return responseUtil(
    200,
    `Welcome ${user.firstName} ${user.lastName}`,
    [{ firstname: user.firstName, lastName: user.lastName }],
    token
  );
};

export { createUser, sign, updateUsers };
