import { Application } from "express";
import { verifyToken } from "../middlewares/auth";
import { HomeController } from "../controllers/home.controller";

export const homeRoutes = (app: Application) => {
  const controller = new HomeController();

  app.get("/v1/home/products", verifyToken, controller.getExpiredProducts);
};
