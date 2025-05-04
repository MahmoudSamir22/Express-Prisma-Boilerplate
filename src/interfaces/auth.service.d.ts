import { ChangePassword, ForgetPasswordReturn, LoginType, SignUpType } from "../types/authType";

export default interface IAuthService {
  signUp(data: SignUpType, role?: string): Promise<UserProfile>;
  login(data: LoginType): Promise<UserProfile>;
  forgetPassword(email: string): Promise<ForgetPasswordReturn>;
  verifyResetPasswordCode(email: string, code: string): Promise<void>;
  resetPassword(email: string, password: string): Promise<void>;
  changePassword(userId: number, data: ChangePassword): Promise<void>;
}
