import { OrderDetails } from "../entity/OrderDetails";
import { Orders } from "../entity/Orders";
import { OrderDto } from "../entity/request/OrderDto";
import { ResponseDTO } from "../entity/response/Response";
import { getTotalPage } from "../helper/handlerGetTotalPage";
import { responsePageUtil, responseUtil } from "../helper/handlerResponse";
import { productByIds } from "./ProductService";
import { findUserById } from "./UserSevice";

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

const findAllByDetail = async (
  id: number,
  idUser: number
): Promise<ResponseDTO> => {
  try {
    const result = await OrderDetails.find({
      relations: {
        order: true,
      },
      where: {
        order: {
          id: id,
          user: {
            id: idUser,
          },
        },
      },
    });
    const sum = result
      .map((element) => {
        return element.value * element.amount;
      })
      .reduce((total, value) => total + value, 0);
      
    return result
      ? responseUtil(200, "Get detail by order", {
          total: sum,
          detail: result,
        })
      : responseUtil(404, "Not found product");
  } catch (error) {
    return responseUtil(500, "Error internal service");
  }
};

const createOrder = async (
  idUser: number,
  createOrder: OrderDto[]
): Promise<ResponseDTO> => {
  const order = new Orders();
  const user = await findUserById(idUser);
  if (!user) {
    return responseUtil(401, "Error user not found");
  }
  order.user = user;
  const result = await order.save();

  const productIds: number[] = createOrder.map((element) => element.product.id);
  const found = await productByIds(productIds);

  const orderDetails = await Promise.all(
    found.map(async (element) => {
      const product = createOrder.find(
        (order) => order.product.id === element.id
      );
      if (product) {
        const orderDetail = new OrderDetails();
        orderDetail.order = order;
        orderDetail.product = element;
        orderDetail.amount = product.amount;
        orderDetail.value = element.price;
        await orderDetail.save();
        return orderDetail;
      }
      return null;
    })
  );

  return responseUtil(203, "Create order", { order: result, orderDetails });
};

export { findAllPages, findAllByDetail, createOrder };
