import * as yup from "yup";

export const categoryValidation = yup.object({
  name: yup.string().required(),
});
