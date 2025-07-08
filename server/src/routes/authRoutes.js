import express from "express";
import { forgetPassword, login, signup } from "../controllers/authController.js";
import { validateRequest } from "../middlewares/validator.js";
import { forgetPasswordValidation, loginValidation, registerValidation } from "../validators/authValidators.js";

const router = express.Router();

router.post("/signup", registerValidation, validateRequest, signup);
router.post("/login", loginValidation, validateRequest, login);
router.post("/forgot-password", forgetPasswordValidation, validateRequest, forgetPassword);

export default router;
