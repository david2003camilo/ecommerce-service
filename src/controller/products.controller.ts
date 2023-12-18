import { Request, Response } from "express";

import { Products } from "../entity/Products";
import { ResponseDTO } from "../entity/response/Response";
import { responseUtil } from "../helper/handlerResponse";

import {
  save,
  get,
  update,
  productById,
  deleteProductById,
} from "../service/ProductService";
import { Photos } from "../entity/Photos";
import { Categories } from "../entity/Categories";

const saveProducts = async (req: Request, res: Response) => {
  let response: ResponseDTO;
  try {
    const { name, price, discount, category, photo, isDiscount } = req.body;

    const photos = new Photos();
    photos.photo = photo.photo;
    photos.active = true;

    const categories = new Categories();
    categories.id = category.id;
    categories.active = category.active;
    categories.description = category.description;
    
    const product = new Products();
    product.name = name;
    product.price = price;
    product.category = categories;

    product.photo = photos;

    product.discount = discount ? discount : 0;
    product.isDiscount = isDiscount ? true : false;

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
    const { idCategory, page, limit} = req.query;
    if (Number(page) === 0) {
      response = responseUtil(402, "Payment required the page major of 0");
      return res.status(response.status).json(response);
    }

    response = await get(Number(idCategory), Number(page) - 1, Number(limit));
    return res.status(response.status).json(response);
  } catch (error) {
    console.error(error);
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
    const { name, price, discount, isDiscount, category, active } = req.body;

    const product = new Products();
    product.id = Number(id);
    product.name = name;
    product.price = price;
    product.discount = discount ? discount : 0;
    product.isDiscount = isDiscount ? isDiscount : false;
    product.category = category;
    product.active = active;


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

export {
  saveProducts,
  getProducts,
  updateProduct,
  getProductById,
  deleteProduct,
};
