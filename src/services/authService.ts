import prisma from "../../prisma/client";
import { SignUpType } from "../types/authType";
import bcrypt from "bcrypt";
import ApiError from "../utils/ApiError";

class AuthService {
    async signUp(data: SignUpType, role?: string){
        const { name, email, password, avatar } = data;
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: await bcrypt.hash(password, 8),
                avatar,
                role
            }
        });
        return user;
    }

    async login(email: string, password: string){
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if(!user){
            throw new ApiError("Incorrect Email or password", 400);
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            throw new ApiError("Incorrect Email or password", 400);
        }
        return user;
    }
}

const authService = new AuthService();
export default authService;