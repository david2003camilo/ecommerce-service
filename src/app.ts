import express from "express";
import morgan from "morgan";
import cors from "cors";

import authRouter from "./routes/auth.routes";
import userRouter from "./routes/users.routes";
import categories from "./routes/categories.routes";
import products from "./routes/products.routes";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use(userRouter);
app.use(authRouter);
app.use(categories);
app.use(products);

export default app;
