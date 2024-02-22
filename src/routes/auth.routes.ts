import { Application } from "express";
import { AuthController } from "../controllers/auth.controller";

export const authRoutes = (app: Application) => {
  const controller = new AuthController();

  app.post("/v1/auth/login", controller.login);
  app.post("/v1/auth/validate", controller.validateToken);
};
