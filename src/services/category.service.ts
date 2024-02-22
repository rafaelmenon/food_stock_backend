import { Prisma } from "@prisma/client";
import { prisma } from "../database/prisma";
import {
  CategoryDTO,
  ReturnCategorysDTO,
  ReturnCategorytDTO,
} from "../models/category.model";

export class CategoryService {
  async create(data: CategoryDTO): Promise<ReturnCategorytDTO> {
    const category = await prisma.category.create({
      data,
    });

    return {
      id: category.id,
      code: 200,
      message: "Categoria adicionada com sucesso",
    };
  }

  async get(
    skip: number,
    limit: number,
    search?: string
  ): Promise<ReturnCategorysDTO> {
    if (search) {
      const [categorys, total] = await prisma.$transaction([
        prisma.category.findMany({
          where: {
            deleted: false,
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          skip,
          take: limit,
        }),
        prisma.category.count({
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
      return { total, totalPage, categorys };
    } else {
      const [categorys, total] = await prisma.$transaction([
        prisma.category.findMany({
          where: {
            deleted: false,
          },
          skip,
          take: limit,
        }),
        prisma.category.count({
          where: {
            deleted: false,
          },
        }),
      ]);

      const totalPage = Math.ceil(total / limit);
      return { total, totalPage, categorys };
    }
  }

  async getById(id: number): Promise<CategoryDTO> {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) throw { code: 404, message: "Categoria não existe" };

    return category;
  }

  async update(
    id: number,
    data: Prisma.CategoryUpdateInput
  ): Promise<ReturnCategorytDTO> {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) throw { code: 404, message: "Categoria não existe" };

    await prisma.category.update({
      where: {
        id,
      },
      data,
    });

    return { code: 200, message: "Categoria atualizado com sucesso" };
  }

  async remove(id: number): Promise<ReturnCategorytDTO> {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) throw { code: 404, message: "Categoria não existe" };

    await prisma.category.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    });

    return { code: 200, message: "Categoria removida com sucesso" };
  }
}
