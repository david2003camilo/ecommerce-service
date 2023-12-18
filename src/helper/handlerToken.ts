import { Request } from "express";

const getToken = (req: Request) => {
  try {
    const headers = req.headers.authorization?.split(" ")[1];
    const token = headers ? headers : "";
    return token; 
  } catch (error) {
    return ""
  }
};

export { getToken };
