import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import response from "../utils/response";

function joiMiddleWare(schema: Joi.ObjectSchema<any>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = schema.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        const validationErrors = error.details.map((detail:any) => detail.message);
        return response(res, 400, { status: false, message: validationErrors[0] });
      }
      
      next();
    } catch (error) {
      next(error);
    }
  };
}

export default joiMiddleWare;
