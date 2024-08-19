import { Request, Response } from "express";
import { responseUtil } from "../helper/handlerResponse";
import { decodeToken } from "../helper/handlerJwt";
import { getToken } from "../helper/handlerToken";
import { findAllByDetail, findAllPages } from "../service/OrdersService";

export const findAll = async (req: Request, res: Response) => {
  const { page, limit } = req.query;
  const idUser = decodeToken(getToken(req));
  if (Number(page) == 0) {
    return res
      .status(402)
      .json(responseUtil(402, "The page is required and major of 0"));
  }
  const response = await findAllPages(
    idUser.id,
    Number(page) - 1,
    Number(limit)
  );

  return res.status(response.status).json(response);
};

export const findByIdDetail = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(402)
      .json(responseUtil(402, "The page is required and major of 0"));
  }

  const response = await findAllByDetail(Number(id));
  return res.status(response.status).json(response);
};
