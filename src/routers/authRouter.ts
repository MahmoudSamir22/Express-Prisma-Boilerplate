import { Router } from "express";
import authController from "../controllers/authController";

const router = Router();

router.post('/signup', authController.signUpUser);

router.post('/login', authController.loginUser);

router.post('/add-users', authController.addUsers);

export default router