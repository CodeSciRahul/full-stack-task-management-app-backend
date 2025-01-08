import { orders, createOrder } from "../service/orderService.js";
import { Router } from "express";

export const orderRoute = Router();

orderRoute.post("/order", createOrder);
orderRoute.get("/orders", orders);