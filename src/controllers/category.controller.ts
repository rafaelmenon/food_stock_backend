import { Request, Response } from "express";
import { categoryValidation } from "../validations/category.validation";
import { CategoryService } from "../services/category.service";

export class CategoryController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = await categoryValidation.validate(req.body);
      const controller = new CategoryService();
      const category = await controller.create(data);
      return res.status(200).send(category);
    } catch (e) {
      return res.status(400).send(e);
    }
  }

  async get(req: Request, res: Response): Promise<Response> {
    try {
      const skip = Number(req.query?.skip) || 0;
      const limit = Number(req.query?.limit) || 20;
      const controller = new CategoryService();
      const category = await controller.get(
        skip,
        limit,
        String(req.query?.search)
      );
      return res.status(200).send(category);
    } catch (e) {
      return res.status(400).send(e);
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const controller = new CategoryService();
      const category = await controller.getById(Number(req.params.id));
      return res.status(200).send(category);
    } catch (e) {
      return res.status(400).send(e);
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const controller = new CategoryService();
      const category = await controller.update(Number(req.params.id), req.body);
      return res.status(200).send(category);
    } catch (e) {
      return res.status(400).send(e);
    }
  }

  async remove(req: Request, res: Response): Promise<Response> {
    try {
      const controller = new CategoryService();
      const category = await controller.remove(Number(req.params.id));
      return res.status(200).send(category);
    } catch (e) {
      return res.status(400).send(e);
    }
  }
}
