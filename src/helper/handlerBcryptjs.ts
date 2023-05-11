import bcrypt from "bcryptjs";

const encrypt = async (textplain: string) => {
  const hash = await bcrypt.hash(textplain, 10);
  return hash;
};

const compare = async (passwordPlain: string, hashPassword: string) => {
  return await bcrypt.compare(passwordPlain, hashPassword);
};

export { encrypt, compare };
