import {Router} from "express";
import {meController, signInController, signOutController, signUpController, verifyController} from "./auth.controller";

const router = Router();

router.post("/sign-in", signInController)

router.post("/sign-up", signUpController)

router.post("/sign-out", signOutController)

router.post("/verify", verifyController)

router.get("/me", meController)

export default router;