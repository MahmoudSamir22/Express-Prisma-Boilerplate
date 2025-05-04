import { Request, Response, NextFunction } from "express";
import userService from "../services/userService";
import response from "../utils/response";
import CustomRequest from "../interfaces/customRequest";

class UserController {
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req as CustomRequest;
      const user = await userService.getProfile(userId);
      response(res, 200, { status: true, message: "User profile", data: user });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.file) {
        req.body.avatar = req.file.path;
      }
      const { userId } = req as CustomRequest;
      const user = await userService.updateProfile(userId, req.body);
      response(res, 200, {
        status: true,
        message: "Profile updated",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

const userController = new UserController();
export default userController;