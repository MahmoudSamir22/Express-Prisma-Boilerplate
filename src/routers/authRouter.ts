import { Router } from "express";
import authController from "../controllers/authController";
import uploadToDiskStorage from "../middlewares/multer";


const router = Router();

router.post('/signup',uploadToDiskStorage.single('avatar'), authController.signUpUser);

router.post('/login', authController.login);

router.post('/add-users', authController.addUsers);

export default router