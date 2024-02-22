import { prisma } from "../database/prisma";
import { UserDTO } from "../models/auth.model";

export class AuthService {
  async getUser(email: string): Promise<UserDTO> {
    const user = await prisma.user.findFirst({
      where: {
        email,
        deleted: false,
      },
    });

    if (!user) throw { code: 404, message: "Usuário inválido" };
    return user;
  }

  async getById(id: number): Promise<UserDTO> {
    const user = await prisma.user.findUnique({
      where: {
        id,
        deleted: false,
      },
    });
    if (!user) throw { code: 404, message: "Usuário inválido" };
    return user;
  }
}
