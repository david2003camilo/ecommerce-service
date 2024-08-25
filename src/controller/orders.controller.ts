import { Request, Response } from "express";
import { responseUtil } from "../helper/handlerResponse";
import { decodeToken } from "../helper/handlerJwt";
import { getToken } from "../helper/handlerToken";
import {
  createOrder,
  findAllByDetail,
  findAllPages,
} from "../service/OrdersService";
import { OrderDto } from "../entity/request/OrderDto";

export const findAll = async (req: Request, res: Response) => {
  const { page, limit } = req.query;
  const user = decodeToken(getToken(req));
  if (Number(page) == 0) {
    return res
      .status(402)
      .json(responseUtil(402, "The page is required and major of 0"));
  }
  const response = await findAllPages(
    user.id,
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
  const user = decodeToken(getToken(req));
  const response = await findAllByDetail(Number(id), Number(user.id));
  return res.status(response.status).json(response);
};

export const create = async (req: Request, res: Response) => {
  const body = req.body as OrderDto[];
  const user = decodeToken(getToken(req));
  const result = await createOrder(Number(user.id), body);
  return res.status(200).json(result);
};
