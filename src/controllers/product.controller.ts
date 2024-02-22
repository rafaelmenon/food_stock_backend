import { Request, Response } from "express";
import { productValidation } from "../validations/product.validation";
import { ProductService } from "../services/product.service";

export class ProductController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = await productValidation.validate(req.body);
      const controller = new ProductService();
      const product = await controller.create(data);
      return res.status(200).send(product);
    } catch (e) {
      return res.status(400).send(e);
    }
  }

  async get(req: Request, res: Response): Promise<Response> {
    try {
      const skip = Number(req.query?.skip) || 0;
      const limit = Number(req.query?.limit) || 20;
      const controller = new ProductService();
      const product = await controller.get(
        skip,
        limit,
        Number(req.query?.categoryId)
      );
      return res.status(200).send(product);
    } catch (e) {
      return res.status(400).send(e);
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const controller = new ProductService();
      const product = await controller.getById(Number(req.params.id));
      return res.status(200).send(product);
    } catch (e) {
      return res.status(400).send(e);
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const controller = new ProductService();
      const product = await controller.update(Number(req.params.id), req.body);
      return res.status(200).send(product);
    } catch (e) {
      return res.status(400).send(e);
    }
  }

  async remove(req: Request, res: Response): Promise<Response> {
    try {
      const controller = new ProductService();
      const product = await controller.remove(Number(req.params.id));
      return res.status(200).send(product);
    } catch (e) {
      return res.status(400).send(e);
    }
  }
}
