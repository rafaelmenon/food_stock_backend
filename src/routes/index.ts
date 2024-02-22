import { Application } from "express";
import { userRoutes } from "./user.routes";
import { authRoutes } from "./auth.routes";
import { productRoutes } from "./product.routes";
import { categoryRoutes } from "./category.routes";
import { homeRoutes } from "./home.routes";

const routes = (app: Application) => {
  userRoutes(app);
  authRoutes(app);
  productRoutes(app);
  categoryRoutes(app);
  homeRoutes(app);
};

export default routes;
