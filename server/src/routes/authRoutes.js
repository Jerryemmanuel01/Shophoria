import express from "express";
import { signup } from "../controllers/authController.js";
import { registerSchema } from "../utils/schema.js";
import { validate } from "../middlewares/validator.js";

const router = express.Router();

router.post("/signup", validate(registerSchema), signup);

export default router;
