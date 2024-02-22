import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { userValidation } from "../validations/user.validation";
import bcrypt from "bcrypt";

export class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = await userValidation.validate(req.body);
      data.password = bcrypt.hashSync(data.password, 10);
      const controller = new UserService();
      const user = await controller.create(data);
      return res.status(200).send(user);
    } catch (e) {
      return res.status(400).send(e);
    }
  }

  async get(req: Request, res: Response): Promise<Response> {
    try {
      const skip = Number(req.query?.skip) || 0;
      const limit = Number(req.query?.limit) || 20;
      const controller = new UserService();
      const user = await controller.get(
        skip,
        limit,
        String(req?.query?.search)
      );
      return res.status(200).send(user);
    } catch (e) {
      return res.status(400).send(e);
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const controller = new UserService();
      const user = await controller.getById(Number(req.params.id));
      return res.status(200).send(user);
    } catch (e) {
      return res.status(400).send(e);
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const controller = new UserService();
      if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
      }
      const user = await controller.update(Number(req.params.id), req.body);
      return res.status(200).send(user);
    } catch (e) {
      return res.status(400).send(e);
    }
  }

  async remove(req: Request, res: Response): Promise<Response> {
    try {
      const controller = new UserService();
      const user = await controller.remove(Number(req.params.id));
      return res.status(200).send(user);
    } catch (e) {
      return res.status(400).send(e);
    }
  }
}
