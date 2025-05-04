import { Router } from "express";
import userController from "../controllers/userController";
import auth from "../middlewares/auth";
import uploadToDiskStorage from "../middlewares/multer";
import joiAsyncMiddleWare from "../middlewares/joiMiddleware";
import { updateProfileSchema } from "../validations/userValidations";

const router = Router();

router
  .route("/profile")
  .get(auth, userController.getProfile)
  .patch(
    auth,
    uploadToDiskStorage.single("avatar"),
    joiAsyncMiddleWare(updateProfileSchema),
    userController.updateProfile
  );

export default router;
