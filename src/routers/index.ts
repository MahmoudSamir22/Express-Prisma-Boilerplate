import { Router } from "express";

import authRouter from "./authRouter";
import userRouter from "./userRouter";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);

export default router;