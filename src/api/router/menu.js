import { 
    menu,
    deleteMenu,
    postMenu,
    updateMenu,
    searchMenu 
} from "../service/menuService.js";

import { Router } from "express";

export const menuRoute = Router();

menuRoute.get("/menu", menu);
menuRoute.post("/menu", postMenu);
menuRoute.put("/menu/:id", updateMenu);
menuRoute.delete("/menu/:id", deleteMenu);
menuRoute.get("/menu/search", searchMenu)