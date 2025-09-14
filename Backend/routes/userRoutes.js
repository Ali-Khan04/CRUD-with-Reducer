import { signUp } from "../controllers/signUpController.js";
import { signIn } from "../controllers/signInController.js";
import express from "express";
const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
export default router;
