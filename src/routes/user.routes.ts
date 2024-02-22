import { Application } from "express";
import { UserController } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/auth";

export const userRoutes = (app: Application) => {
  const controller = new UserController();

  app.post("/v1/user", controller.create);
  app.get("/v1/user", verifyToken, controller.get);
  app.get("/v1/user/:id", verifyToken, controller.getById);
  app.put("/v1/user/:id", verifyToken, controller.update);
  app.delete("/v1/user/:id", verifyToken, controller.remove);
};
