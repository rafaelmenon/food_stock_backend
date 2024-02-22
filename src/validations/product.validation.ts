import * as yup from "yup";

export const productValidation = yup.object({
  name: yup.string().required(),
  price: yup.number().required(),
  purchase_date: yup.string().required(),
  expiration_date: yup.string().required(),
  categoryId: yup.number().required(),
});
