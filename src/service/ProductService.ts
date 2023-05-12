import { Products } from "../entity/Products";
import { responseUtil } from "../helper/handlerResponse";

const save = async (products: Products) => {
  const product = await products.save();
  return responseUtil(200, "Created product", product);
};

export { save };
