import { catchAsync } from "../helpers/catchAsync.js";
import userService from "../services/userService.js";

export const signup = catchAsync(async (req, res, next) => {
  const { confirmPassword, ...userData } = req.body;

  await userService.signup(res, userData);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  await userService.login(res, email, password);
});

export const forgetPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  await userService.forgetPassword(res, email)
});
