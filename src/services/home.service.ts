import { prisma } from "../database/prisma";
import moment from "moment";
import { ProductDTO } from "../models/product.model";

export class HomeService {
  async getExpiredProducts(): Promise<ProductDTO[]> {
    const products = await prisma.product.findMany({
      where: {
        deleted: false,
      },
    });

    let productsExpired: ProductDTO[] = [];

    if (products.length) {
      const date = new Date();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const fullDate = `${month}/${year}`;

      await products.map((data: ProductDTO) => {
        const dateProduct = new Date(data.expiration_date);
        const maturity = dateProduct.getMonth() + 1;
        const maturityYear = dateProduct.getFullYear();
        const fullDateProduct = `${maturity}/${maturityYear}`;

        if (fullDate === fullDateProduct) {
          productsExpired.push(data);
        }
      });
    }

    return productsExpired;
  }
}
