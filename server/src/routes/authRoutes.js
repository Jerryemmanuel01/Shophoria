import express from "express";
import { signup } from "../controllers/authController.js";
import { validateRequest } from "../middlewares/validator.js";
import { registerValidation } from "../validators/authValidators.js";

const router = express.Router();

router.post("/signup", registerValidation, validateRequest, signup);

export default router;
