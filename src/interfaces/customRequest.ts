import {User} from "@prisma/client";
import {Request} from "express";

export default interface CustomRequest extends Request {
    user?: number | User,
    role?: string
}