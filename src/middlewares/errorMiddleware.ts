import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError";
import response from "../utils/response";

export default (err:ApiError, req:Request, res:Response, next:NextFunction) => {
    err.statusCode = err.statusCode || 500;
    if(process.env.NODE_ENV === "development"){
        response(res, err.statusCode, {status: false, message: err.message, stack: err.stack})
    }else {
        response(res, err.statusCode, {status: false, message: err.message})
    }
}