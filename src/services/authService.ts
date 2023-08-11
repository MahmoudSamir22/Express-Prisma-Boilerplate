import prisma from "../../prisma/client";
import { SignUpType } from "../types/authType";
import bcrypt from "bcrypt";
import ApiError from "../utils/ApiError";
import generateOTP, { encrypt } from "../utils/generateOTP";

class AuthService {
  async signUp(data: SignUpType, role?: string) {
    const { name, email, password, avatar } = data;
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: await bcrypt.hash(password, 8),
        avatar,
        role,
      },
    });
    return user;
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new ApiError("Incorrect Email or password", 400);
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new ApiError("Incorrect Email or password", 400);
    }
    return user;
  }

  async forgetPassword(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    const codes = generateOTP();
    await prisma.user_Codes.upsert({
      where: {
        userId: user.id,
      },
      update: {
        resetPasswordCode: codes.hashedOTP,
        resetPasswordCodeExpiresAt: new Date(codes.otpExpiration),
      },
      create: {
        resetPasswordCode: codes.hashedOTP,
        resetPasswordCodeExpiresAt: new Date(codes.otpExpiration),
        userId: user.id,
      },
    });
    return { email: user.email, code: codes.otp, username: user.name };
  }

  async verifyResetPasswordCode(email: string, code: string) {
    const hashedOTP = encrypt(code);
    const userCode = await prisma.user_Codes.findFirst({
        where: {
            resetPasswordCode: hashedOTP,
            resetPasswordCodeExpiresAt: {
                gte: new Date()
            },
            User: {
                email
            }
        }
    })
    if(!userCode){
        throw new ApiError("Code is Invalid Or Expired", 400)
    }
  }

    async resetPassword(email: string, password: string) {
        await prisma.user.update({
            where: {
                email
            },
            data: {
                password: await bcrypt.hash(password, 8)
            }
        })
    }
}

const authService = new AuthService();
export default authService;
