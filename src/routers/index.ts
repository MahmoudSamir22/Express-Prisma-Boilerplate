import { Router } from "express";

import authRouter from "./authRouter";

const router = Router();

router.use("/auth", authRouter);
router.all("*", (req, res, next) => {
    res.status(404).json({status: false, message: `Endpoint not found: ${req.method} ${req.originalUrl}`});
})
export default router;