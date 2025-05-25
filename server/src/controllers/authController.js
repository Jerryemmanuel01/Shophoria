import { validate } from "../middlewares/validator.js";
import userService from "../services/userService.js";
import { registerSchema } from "../utils/schema.js";

export const signup = async (req, res) => {
  const { confirmPassword, ...userData } = req.body;

  await userService.registerUser(userData);
  res.status(201).json({ message: "Signup successful", success: true });
};
