import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { responseUtil } from "../helper/handlerResponse";

export const validateRequest =
  (schema: z.AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    const validated = schema.safeParse(req.body);

    if (validated.success) {
      return next();
    } else {
      return res
        .status(400)
        .json(
          responseUtil(400, "Invalid request format", validated.error.errors)
        );
    }
  };
