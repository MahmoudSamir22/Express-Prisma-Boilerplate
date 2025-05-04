import { Router } from "express";
import userController from "../controllers/userController";
import auth from "../middlewares/auth";
import uploadToDiskStorage from "../middlewares/multer";
import joiMiddleWare from "../middlewares/joiMiddleware";
import { updateProfileSchema } from "../validations/userValidations";

const router = Router();

router
  .route("/profile")
  .get(auth, userController.getProfile)
  .patch(
    auth,
    uploadToDiskStorage.single("avatar"),
    joiMiddleWare(updateProfileSchema),
    userController.updateProfile
  );

export default router;
