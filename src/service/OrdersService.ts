import { OrderDetails } from "../entity/OrderDetails";
import { Orders } from "../entity/Orders";
import { ResponseDTO } from "../entity/response/Response";
import { getTotalPage } from "../helper/handlerGetTotalPage";
import { responsePageUtil, responseUtil } from "../helper/handlerResponse";

const findAllPages = async (
  idUser: number,
  page: number,
  limit: number
): Promise<ResponseDTO> => {
  try {
    const [result, total] = await Orders.findAndCount({
      skip: page * limit,
      take: limit,
      relations: {
        user: true,
      },
      where: {
        user: {
          id: idUser,
        },
      },
    });
    const totalPage = getTotalPage(total, limit);

    return result
      ? responsePageUtil(200, "Get orders", result, page + 1, limit, totalPage)
      : responseUtil(404, "Not found product");
  } catch (error) {
    return responseUtil(500, "Error internal service");
  }
};

const findAllByDetail = async (id: number): Promise<ResponseDTO> => {
  try {
    const result = await OrderDetails.find({
      where: {
        order: {
          id: id,
        },
      },
    });
    return result
      ? responseUtil(200, "Get detail by order", result)
      : responseUtil(404, "Not found product");
  } catch (error) {
    return responseUtil(500, "Error internal service");
  }
};

export { findAllPages, findAllByDetail };
