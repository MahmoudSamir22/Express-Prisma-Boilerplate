import prisma from "../../prisma/client";
import IUserService from "../interfaces/user.service";
import { UserProfile, UpdateProfile } from "../types/userType";
import ApiError from "../utils/ApiError";

class UserService implements IUserService {
  async getProfile(user_id: number): Promise<UserProfile> {
    const user = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
      },
    });
    if (!user) throw new ApiError("User not found", 404);
    return user;
  }

  async updateProfile(
    user_id: number,
    data: UpdateProfile
  ): Promise<UserProfile> {
    const user = await prisma.user.update({
      where: {
        id: user_id,
      },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
      },
    });
    if (!user) throw new ApiError("User not found", 404);
    return user;
  }
}


const userService = new UserService();
export default userService;