import Joi from "joi";
import { SignUpType, LoginType } from "../types/authType";
import { Roles } from "../enum/roles";
import prisma from "../../prisma/client";

export const registerValidationSchema = Joi.object<SignUpType>().keys({
  name: Joi.string().required(),
  email: Joi.string()
    .email()
    .external(async (value) => {
        const user = await prisma.user.findUnique({
          where: {
            email: value,
          },
        });
        if (user) {
          throw new Error("Email already exists");
        }
      })
    .required(),
  password: Joi.string().required(),
  role: Joi.string()
    .valid(...Object.values(Roles))
    .optional(),
});

export const loginValidationSchema = Joi.object<LoginType>().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
