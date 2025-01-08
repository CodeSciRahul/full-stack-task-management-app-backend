import { 
    menu,
    deleteMenu,
    postMenu,
    updateMenu 
} from "../service/menuService.js";

import { Router } from "express";

export const menuRoute = Router();

menuRoute.get("/menu", menu);
menuRoute.post("/menu", postMenu);
menuRoute.put("/menu/:id", updateMenu);
menuRoute.delete("/menu/:id", deleteMenu);