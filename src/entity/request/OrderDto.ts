import { Products } from "../Products";

export interface OrderDto  {
    product: Products,
    amount: number
}