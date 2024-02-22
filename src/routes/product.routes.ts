import { Application } from "express";
import { verifyToken } from "../middlewares/auth";
import { ProductController } from "../controllers/product.controller";

export const productRoutes = (app: Application) => {
  const controller = new ProductController();

  app.post("/v1/product", verifyToken, controller.create);
  app.get("/v1/product", verifyToken, controller.get);
  app.get("/v1/product/:id", verifyToken, controller.getById);
  app.put("/v1/product/:id", verifyToken, controller.update);
  app.delete("/v1/product/:id", verifyToken, controller.remove);
};
