import { Request, Response } from "express";
import { HomeService } from "../services/home.service";

export class HomeController {
  async getExpiredProducts(req: Request, res: Response): Promise<Response> {
    try {
      const controller = new HomeService();
      const products = await controller.getExpiredProducts();
      return res.status(200).send(products);
    } catch (e) {
      return res.status(400).send(e);
    }
  }
}
