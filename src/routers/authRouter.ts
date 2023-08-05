import { Router } from "express";
import authController from "../controllers/authController";
import uploadToDiskStorage from "../middlewares/multer";

const router = Router();

router.post(
  "/signup",
  uploadToDiskStorage.single("avatar"),
  authController.signUpUser
);

router.post("/login", authController.login);

router.post("/add-users", authController.addUsers);

router.post("/forget-password", authController.forgetPassword);

router.post("/verify-reset-code", authController.verifyResetCode);

router.post("/reset-password", authController.resetPassword);

export default router;
