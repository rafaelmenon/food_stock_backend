import * as yup from "yup";

export const loginValidation = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});

export const validateValidation = yup.object({
  token: yup.string().required(),
});
