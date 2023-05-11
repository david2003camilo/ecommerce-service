import { Categories } from "../entity/Categories";
import { verifyJwt } from "../helper/handlerJwt";
import { responseUtil } from "../helper/handlerResponse";

const getCategories = async () => {
  /* Searching all the active */
  const categories = await Categories.findBy({ active: true });
  return categories.length > 0
    ? responseUtil(200, "ok", categories)
    : responseUtil(404, "No found");
};

const saveCategories = async (category: Categories, token: string) => {
  const isVerify = verifyJwt(token, true);
  /* If not access finish process */
  if (isVerify.status == 403) return isVerify;
  const isSave = await category.save();
  if (!isSave) return responseUtil(500, "Error internal");
  return responseUtil(203, "Category created", [category]);
};

const updateCategories = async (category: Categories, token: string) => {
  const isVerify = verifyJwt(token, true);
  /* If not have access finish process */
  if (isVerify.status == 403) return isVerify;
  const categories = await Categories.findOneBy({ id: category.id });
  /* return if not exist data */
  if (!categories) return responseUtil(404, "Not found category");

  const isUpdate = await Categories.update({ id: categories.id }, category);

  if (!isUpdate) return responseUtil(500, "Error internal");

  return responseUtil(200, "Create category", [category]);
};

export { getCategories, saveCategories, updateCategories };
