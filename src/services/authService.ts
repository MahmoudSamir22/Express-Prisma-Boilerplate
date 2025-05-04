import prisma from "../../prisma/client";
import { ForgetPasswordReturn, LoginType, SignUpType } from "../types/authType";
import bcrypt from "bcrypt";
import ApiError from "../utils/ApiError";
import generateOTP, { encrypt } from "../utils/generateOTP";
import IAuthService from "../interfaces/auth.service";
import { UserProfile } from "../types/userType";

class AuthService implements IAuthService {
  async signUp(data: SignUpType, role?: string): Promise<UserProfile> {
    const { name, email, password, avatar } = data;
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: await bcrypt.hash(password, 8),
        avatar,
        role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true,
        avatar: true,
      }
    });
    const { password: _, ...profile } = user;
    return profile;
  }

  async login(data: LoginType): Promise<UserProfile> {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true,
        avatar: true,
      },
    });
    if (!user) {
      throw new ApiError("Incorrect Email or password", 400);
    }
    const { password, ...profile } = user;
    const passwordMatch = await bcrypt.compare(data.password, password);
    if (!passwordMatch) {
      throw new ApiError("Incorrect Email or password", 400);
    }
    return profile;
  }

  async forgetPassword(email: string): Promise<ForgetPasswordReturn> {
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

  async verifyResetPasswordCode(email: string, code: string): Promise<void> {
    const hashedOTP = encrypt(code);
    const userCode = await prisma.user_Codes.findFirst({
      where: {
        resetPasswordCode: hashedOTP,
        resetPasswordCodeExpiresAt: {
          gte: new Date(),
        },
        User: {
          email,
        },
      },
    });
    if (!userCode) {
      throw new ApiError("Code is Invalid Or Expired", 400);
    }
  }

  async resetPassword(email: string, password: string): Promise<void> {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        password: await bcrypt.hash(password, 8),
      },
    });
  }
}

const authService = new AuthService();
export default authService;
