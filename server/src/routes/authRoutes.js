import express from "express";
import { login, signup } from "../controllers/authController.js";
import { validateRequest } from "../middlewares/validator.js";
import { loginValidation, registerValidation } from "../validators/authValidators.js";

const router = express.Router();

router.post("/signup", registerValidation, validateRequest, signup);
router.post("/login", loginValidation, validateRequest, login);

export default router;
