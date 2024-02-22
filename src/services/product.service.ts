import { prisma } from "../database/prisma";
import { Prisma } from "@prisma/client";
import {
  ProductDTO,
  ReturnProductDTO,
  ReturnProductsDTO,
} from "../models/product.model";

export class ProductService {
  async create(data: ProductDTO): Promise<ReturnProductDTO> {
    const product = await prisma.product.create({
      data,
    });

    return {
      id: product?.id,
      code: 200,
      message: "Produto criado com sucesso",
    };
  }

  async get(
    skip: number,
    limit: number,
    categoryId?: number
  ): Promise<ReturnProductsDTO> {
    if (categoryId) {
      const [products, total] = await prisma.$transaction([
        prisma.product.findMany({
          where: {
            deleted: false,
            categoryId,
          },
          include: {
            category: true,
          },
          skip,
          take: limit,
        }),
        prisma.product.count({
          where: {
            deleted: false,
            categoryId,
          },
        }),
      ]);

      const totalPage = Math.ceil(total / limit);
      return { total, totalPage, products };
    } else {
      const [products, total] = await prisma.$transaction([
        prisma.product.findMany({
          where: {
            deleted: false,
          },
          include: {
            category: true,
          },
          skip,
          take: limit,
        }),
        prisma.product.count({
          where: {
            deleted: false,
          },
        }),
      ]);

      const totalPage = Math.ceil(total / limit);
      return { total, totalPage, products };
    }
  }

  async getById(id: number): Promise<ProductDTO> {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) throw { code: 404, message: "Produto não exsite" };

    return product;
  }

  async update(
    id: number,
    data: Prisma.ProductUpdateInput
  ): Promise<ReturnProductDTO> {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) throw { code: 404, message: "Produto não exsite" };

    await prisma.product.update({
      where: {
        id,
      },
      data,
    });

    return { code: 200, message: "Producto atualizado com sucesso" };
  }

  async remove(id: number): Promise<ReturnProductDTO> {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) throw { code: 404, message: "Produto não exsite" };

    await prisma.product.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    });

    return { code: 200, message: "Produto removido com sucesso" };
  }
}
