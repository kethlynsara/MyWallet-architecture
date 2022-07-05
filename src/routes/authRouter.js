import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";
import { checkSignInData, checkSignUpData } from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post("/sign-up", checkSignUpData, signUp);
authRouter.post("/sign-in", checkSignInData, signIn);

export default authRouter;