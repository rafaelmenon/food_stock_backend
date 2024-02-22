import { Application } from "express";
import { verifyToken } from "../middlewares/auth";
import { CategoryController } from "../controllers/category.controller";

export const categoryRoutes = (app: Application) => {
  const controller = new CategoryController();

  app.post("/v1/category", verifyToken, controller.create);
  app.get("/v1/category", verifyToken, controller.get);
  app.get("/v1/category/:id", verifyToken, controller.getById);
  app.put("/v1/category/:id", verifyToken, controller.update);
  app.delete("/v1/category/:id", verifyToken, controller.remove);
};
