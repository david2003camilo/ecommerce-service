import { Request, Response } from "express";

import { Products } from "../entity/Products";
import { ResponseDTO } from "../entity/response/Response";
import { responseUtil } from "../helper/handlerResponse";

import { getToken } from "../helper/handlerToken";
import { verifyJwt } from "../helper/handlerJwt";
import {
  save,
  get,
  update,
  productById,
  deleteProductById,
} from "../service/ProductService";

const saveProducts = async (req: Request, res: Response) => {
  let response: ResponseDTO;
  try {
    const { name, price, discount, categoryId } = req.body;
    const token = getToken(req);

    response = verifyJwt(token);
    if (response.status == 403) {
      return res.status(response.status).json(response);
    }

    const product = new Products();
    product.name = name;
    product.price = price;
    product.categoryId = categoryId;

    if (discount) {
      product.discount = discount;
      product.isDiscount = true;
    }

    response = await save(product);

    return res.status(response.status).json(response);
  } catch (error) {
    response = responseUtil(500, "Error internal");
    return res.status(response.status).json(response);
  }
};

const getProducts = async (req: Request, res: Response) => {
  let response: ResponseDTO;
  try {
    const { idCategory } = req.query;

    response = await get(Number(idCategory));
    return res.status(response.status).json(response);
  } catch (error) {
    response = responseUtil(500, "Error internal");
    return res.status(response.status).json(response);
  }
};

const getProductById = async (req: Request, res: Response) => {
  let response: ResponseDTO;
  try {
    const { id } = req.params;
    response = await productById(Number(id));
    return res.status(response.status).json(response);
  } catch (error) {
    response = responseUtil(500, "Error internal");
    return res.status(response.status).json(response);
  }
};

const updateProduct = async (req: Request, res: Response) => {
  let response: ResponseDTO;
  try {
    const { id } = req.params;
    const { name, price, discount, isDiscount, categoryId, active } = req.body;
    const token = getToken(req);

    const product = new Products();
    product.id = Number(id);
    product.name = name;
    product.price = price;
    product.discount = discount;
    product.isDiscount = isDiscount;
    product.categoryId = categoryId;
    product.active = active;

    response = verifyJwt(token);
    if (response.status == 403) {
      return res.status(response.status).json(response);
    }

    response = await update(product);

    return res.status(response.status).json(response);
  } catch (error) {
    response = responseUtil(500, "Error internal");
    return res.status(response.status).json(response);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  let response: ResponseDTO;
  try {
    const { id } = req.params;
    response = await deleteProductById(Number(id));
    return res.status(response.status).json(response);
  } catch (error) {
    response = responseUtil(500, "Error internal");
    return res.status(response.status).json(response);
  }
};

export { saveProducts, getProducts, updateProduct, getProductById, deleteProduct };
