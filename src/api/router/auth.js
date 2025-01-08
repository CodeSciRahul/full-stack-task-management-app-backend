import { register,login } from "../service/userService.js";
import { Router} from "express";

export const authRoute = Router();

authRoute.post("/register", register)
authRoute.post("/login", login)


