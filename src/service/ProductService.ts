import { Products } from "../entity/Products";
import { responseUtil } from "../helper/handlerResponse";

const save = async (products: Products) => {
  const product = await products.save();
  return responseUtil(200, "Created product", product);
};

const get = async (idCategory: number) => {
  const products = await Products.findBy({ categoryId: idCategory });
  return products.length > 0
    ? responseUtil(200, "Get products", products)
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
  await Products.delete({id: id});
  return responseUtil(204, "Deleted product");
}

export { save, get, update, productById, deleteProductById };
