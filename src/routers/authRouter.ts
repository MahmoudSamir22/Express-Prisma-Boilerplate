import { Router } from "express";
import authController from "../controllers/authController";
import uploadToDiskStorage from "../middlewares/multer";
import joiAsyncMiddleWare from "../middlewares/joiMiddleware";
import {
  registerValidationSchema,
  loginValidationSchema,
  changePasswordValidationSchema,
} from "../validations/authValidations";
import auth from "../middlewares/auth";
const router = Router();

router.post(
  "/signup",
  uploadToDiskStorage.single("avatar"),
  joiAsyncMiddleWare(registerValidationSchema),
  authController.signUpUser
);

router.post(
  "/login",
  joiAsyncMiddleWare(loginValidationSchema),
  authController.login
);

router.post("/add-users", authController.addUsers);

router.post("/forget-password", authController.forgetPassword);

router.post("/verify-reset-code", authController.verifyResetCode);

router.post("/reset-password", authController.resetPassword);

router.post(
  "/change-password",
  auth,
  joiAsyncMiddleWare(changePasswordValidationSchema),
  authController.changePassword
);

export default router;
