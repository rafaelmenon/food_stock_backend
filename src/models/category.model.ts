export type CategoryDTO = {
  name: string;
};

export type ReturnCategorytDTO = {
  id?: number;
  code: number;
  message: string;
};

export type ReturnCategorysDTO = {
  total: number;
  totalPage: number;
  categorys: CategoryDTO[];
};
