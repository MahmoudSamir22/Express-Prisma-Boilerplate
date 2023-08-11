import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError";
import response from "../utils/response";
import removeFile from "../utils/fileHandler";

export default (err:ApiError, req:Request, res:Response, next:NextFunction) => {
    if(req.file){
        removeFile(req.file.path)
    }
    if(req.files){
        (req.files as Express.Multer.File[]).forEach((file:Express.Multer.File) => {
            removeFile(file.path)
        })
    }
    err.statusCode = err.statusCode || 500;
    if(process.env.NODE_ENV === "development"){
        response(res, err.statusCode, {status: false, message: err.message, stack: err.stack})
    }else {
        response(res, err.statusCode, {status: false, message: err.message})
    }
}