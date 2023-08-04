import prisma from "../../prisma/client";
import { SignUpType } from "../types/authType";
import bcrypt from "bcrypt";
import ApiError from "../utils/ApiError";

class AuthService {
    async signUp(data: SignUpType, role?: string){
        const { name, email, password } = data;
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: await bcrypt.hash(password, 8),
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
            throw new ApiError("User not found", 400);
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            throw new ApiError("Incorrect password", 400);
        }
        return user;
    }
}

const authService = new AuthService();
export default authService;