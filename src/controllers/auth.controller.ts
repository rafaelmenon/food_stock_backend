import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import {
  loginValidation,
  validateValidation,
} from "../validations/auth.validation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthController {
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const body = await loginValidation.validate(req.body);
      const controller = new AuthService();
      const user = await controller.getUser(body.email);

      // if (!user) throw { message: 'Usuário inválido' };

      if (!user.status) throw { code: 400, messaage: "Usuário bloqueado" };

      if (user && bcrypt.compareSync(body.password, user.password)) {
        const token = jwt.sign(
          {
            id: user.id,
            name: user.name,
            email: user.email,
          },
          String(process.env.TOKEN_KEY),
          { expiresIn: "24h" }
        );

        return res.status(200).send({ token });
      } else {
        return res
          .status(401)
          .send({ message: "Usuário e/ou senha incorretos" });
      }
    } catch (e: any) {
      return res.status(400).send(e);
    }
  }

  async validateToken(req: Request, res: Response): Promise<Response> {
    try {
      const data = await validateValidation.validate(req.body);
      const decode = await jwt.decode(data.token);
      return res.status(200).send(decode);
    } catch (e) {
      return res.status(400).send(e);
    }
  }
}
