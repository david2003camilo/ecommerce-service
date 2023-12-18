import { Request, Response, NextFunction } from "express";
import { getToken } from "../helper/handlerToken";
import { verifyJwt } from "../helper/handlerJwt";

const authAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = getToken(req);
  const isVerify = await verifyJwt(token, false);
  /* If not access finish process */
  if (isVerify.status == 403 || isVerify.status == 401) {
    res.status(isVerify.status);
    res.send(isVerify);
    return;
  }
  next();
};

const authClientMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = getToken(req);
  const isVerify = await verifyJwt(token, true);
  /* If not access finish process */
  if (isVerify.status == 403 || isVerify.status == 401) {
    res.status(isVerify.status);
    res.send(isVerify);
    return;
  }
  next();
};

export { authClientMiddleware, authAdminMiddleware };
