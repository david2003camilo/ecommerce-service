import { Request, Response } from "express";
import {
  getCategories,
  saveCategories,
  updateCategories,
} from "../service/CategoriesService";
import { ResponseDTO } from "../entity/response/Response";
import { responseUtil } from "../helper/handlerResponse";
import { Categories } from "../entity/Categories";
import { getToken } from "../helper/handlerToken";

export const getAllCategories = async (req: Request, res: Response) => {
  let response: ResponseDTO;
  try {
    const response = await getCategories();
    return res.status(response.status).json(response);
  } catch (error) {
    response = responseUtil(500, "Error internal");
    return res.status(response.status).json(response);
  }
};

export const save = async (req: Request, res: Response) => {
  let response: ResponseDTO;
  try {
    const { description } = req.body;
    const category = new Categories();
    category.description = description;
    const response = await saveCategories(category);
    return res.status(response.status).json(response);
  } catch (error) {
    response = responseUtil(500, "Error internal");
    return res.status(500).json(response);
  }
};

export const update = async (req: Request, res: Response) => {
  let response: ResponseDTO;
  try {
    const { id } = req.params;
    const { description } = req.body;
    const category = new Categories();
    const token = getToken(req);
    category.id = Number(id);
    category.description = description;
    response = await updateCategories(category, token);
    return res.status(response.status).json(response);
  } catch (error) {
    response = responseUtil(500, "Error internal");
    return res.status(response.status).json(response);
  }
};
