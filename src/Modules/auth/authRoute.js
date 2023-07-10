import express from "express";
import { signIn, signUp } from "./authController.js";
import {
  signInValidation,
  signUpValidation,
} from "../../Middlewares/Validations/authValidation.js";
import { validation } from "../../Middlewares/validation.js";
let router = express.Router();
router.post("/signUp", validation(signUpValidation), signUp);
router.post("/signIn", validation(signInValidation), signIn);
export default router;
