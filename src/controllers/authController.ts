import { NextFunction, Request, Response } from "express";
import authService from "../services/authService";
import response from "../utils/response";
import signToken from "../utils/signToken";
import sendMail from "../utils/sendMails";
import pug from "pug";

class AuthController {
  async signUpUser(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.file) {
        req.body.avatar = req.file.path;
      }
      const user = await authService.signUp(req.body);
      response(res, 201, {
        status: true,
        message: "Account created successfully!",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await authService.login(req.body);
      const { access_token, refresh_token } = signToken({
        id: user.id,
        role: user.role,
      });
      response(res, 200, {
        status: true,
        message: "Login successful!",
        data: { access_token, refresh_token, user },
      });
    } catch (error) {
      next(error);
    }
  }

  async addUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await authService.signUp(req.body, req.body.role);
      response(res, 201, {
        status: true,
        message: "User created successfully!",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async forgetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await authService.forgetPassword(req.body.email);
      const html = pug.renderFile(
        `${process.cwd()}/src/templates/forgetPassword.pug`,
        { code: user.code, username: user.username }
      );
      sendMail({ to: user.email, html, subject: "Reset Password" });
      response(res, 200, {
        status: true,
        message: "Reset Code Sent Successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyResetCode(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.verifyResetPasswordCode(
        req.body.email,
        req.body.code.toString()
      );
      response(res, 200, {
        status: true,
        message: "Code Verified Successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.resetPassword(req.body.email, req.body.password);
      response(res, 200, {
        status: true,
        message: "Password reset successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
const authController = new AuthController();
export default authController;
