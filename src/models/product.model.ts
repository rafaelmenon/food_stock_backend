export type ProductDTO = {
  name: string;
  price: number;
  purchase_date: string;
  expiration_date: string;
  categoryId: number;
  category?: any;
};

export type ReturnProductDTO = {
  id?: number;
  code: number;
  message: string;
};

export type ReturnProductsDTO = {
  total: number;
  totalPage: number;
  products: ProductDTO[];
};
