import { prisma } from "../database/prisma";
import {
  UserDTO,
  ReturnUserDTO,
  ReturnUsersDTO,
  UsersDTO,
} from "../models/user.model";
import { Prisma } from "@prisma/client";

export class UserService {
  async create(data: UserDTO): Promise<ReturnUserDTO> {
    const user = await prisma.user.create({
      data,
    });

    return { id: user.id, code: 200, message: "Usuário criado com sucesso" };
  }

  async get(
    skip: number,
    limit: number,
    search?: string
  ): Promise<ReturnUsersDTO> {
    if (search) {
      const [users, total] = await prisma.$transaction([
        prisma.user.findMany({
          where: {
            deleted: false,
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          skip,
          take: limit,
          orderBy: {
            id: "desc",
          },
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
          },
        }),
        prisma.user.count({
          where: {
            deleted: false,
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        }),
      ]);

      const totalPage = Math.ceil(total / limit);
      return { total, totalPage, users };
    } else {
      const [users, total] = await prisma.$transaction([
        prisma.user.findMany({
          where: {
            deleted: false,
          },
          skip,
          take: limit,
          orderBy: {
            id: "desc",
          },
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
          },
        }),
        prisma.user.count({
          where: {
            deleted: false,
          },
        }),
      ]);

      const totalPage = Math.ceil(total / limit);
      return { total, totalPage, users };
    }
  }

  async getById(id: number): Promise<ReturnUserDTO | UsersDTO> {
    const user = await prisma.user.findUnique({
      where: {
        id,
        deleted: false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) throw { code: 404, message: "Usuário não encontrado" };

    return user;
  }

  async update(
    id: number,
    data: Prisma.UserUpdateInput
  ): Promise<ReturnUserDTO> {
    const user = prisma.user.findUnique({
      where: {
        id,
        deleted: false,
      },
    });

    if (!user) throw { code: 404, message: "Usuário não encontrado" };

    await prisma.user.update({
      where: {
        id,
      },
      data,
    });

    return { code: 200, message: "Usuário editado com sucesso" };
  }

  async remove(id: number): Promise<ReturnUserDTO> {
    const user = prisma.user.findUnique({
      where: {
        id,
        deleted: false,
      },
    });

    if (!user) throw { code: 404, message: "Usuário não encontrado" };

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    });

    return { code: 200, message: "Usuário removido com sucesso" };
  }
}
