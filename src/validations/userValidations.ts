import Joi from "joi";
import { UpdateProfile } from "../types/userType";

export const updateProfileSchema = Joi.object<UpdateProfile>().keys({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
});
