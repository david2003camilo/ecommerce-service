import { Products } from "../entity/Products";
import { getTotalPage } from "../helper/handlerGetTotalPage";
import { responsePageUtil, responseUtil } from "../helper/handlerResponse";

const save = async (products: Products) => {
  const product = await products.save();
  return responseUtil(200, "Created product", product);
};

const get = async (idCategory: number, page: number, limit: number) => {
  const [result, total] = await Products.findAndCount({
    skip: page * limit,
    take: limit,
    where: { categoryId: idCategory },
  });

  const totalPage = getTotalPage(total, limit);

  return result
    ? responsePageUtil(200, "Get products", result, page + 1, limit, totalPage)
    : responseUtil(404, "Not found product");
};

const update = async (products: Products) => {
  const product = await Products.findOneBy({ id: products.id });

  if (!product) return responseUtil(404, "No found product");

  await Products.update({ id: product.id }, products);

  return responseUtil(200, `The product ${product.id} is updated`);
};

const productById = async (id: number) => {
  const product = await Products.findOneBy({ id: id });
  return product
    ? responseUtil(200, "Get product", product)
    : responseUtil(404, "No found product");
};

const deleteProductById = async (id: number) => {
  await Products.delete({ id: id });
  return responseUtil(204, "Deleted product");
};

export { save, get, update, productById, deleteProductById };
