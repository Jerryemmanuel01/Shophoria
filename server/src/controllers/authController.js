import { catchAsync } from "../helpers/catchAsync.js";
import userService from "../services/userService.js";
import { APIResponseHandler } from "../utils/responseHandler.js";

export const signup = catchAsync(async (req, res, next) => {
  const { confirmPassword, ...userData } = req.body;

  await userService.registerUser(res, userData);
 
  APIResponseHandler(res, true, 201, "Signup successful", []);
});
