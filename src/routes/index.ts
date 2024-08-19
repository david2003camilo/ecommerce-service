import authRouter from "./auth.routes";
import userRouter from "./users.routes";
import categories from "./categories.routes";
import products from "./products.routes";
import orders from "./orders.routes";

const routers = [authRouter, userRouter, categories, products, orders ];

export default routers;
