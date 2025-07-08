import userRepository from "../repositories/userRepository.js";
import { APIResponseHandler } from "../utils/responseHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { hmacProcess } from "../middlewares/validator.js";
import { transport } from "./emailService.js";
import emailTemplate from "../utils/emailTemplate.js";

dotenv.config();

class UserService {
  async signup(res, data) {
    const { password, email, ...userData } = data;

    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      return APIResponseHandler(res, false, 400, "Email has been used!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userEmail = email.toLowerCase();
    const userInfo = {
      ...userData,
      password: hashedPassword,
      email: userEmail,
    };
    const newUser = await userRepository.createUser(userInfo);
    if (!newUser) {
      return APIResponseHandler(
        res,
        false,
        400,
        "Error occurred! Please try again"
      );
    }
    return APIResponseHandler(res, true, 201, "Signup successful");
    0;
  }

  // Login
  async login(res, email, password) {
    const userEmail = email.toLowerCase();

    const user = await userRepository.loginByEmail(userEmail);
    if (!user) {
      return APIResponseHandler(res, false, 400, "Invalid email or password!");
    }

    const comparePassword = await bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return APIResponseHandler(res, false, 400, "Invalid email or password!");
    }

    const payload = {
      id: user._id,
      email: user.email,
      name: user.firstName,
    };
    const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    return APIResponseHandler(res, true, 200, "login successful", "", token);
  }

  //forgetPassword
  async forgetPassword(res, email) {
    const userEmail = email.toLowerCase();

    const user = await userRepository.findByEmail(userEmail);
    if (!user) {
      return APIResponseHandler(res, false, 400, "User does not exist!");
    }

    const codeValue = Math.floor(Math.random() * 1000000).toString();
    const hashedCodeValue = hmacProcess(
      codeValue,
      process.env.HMAC_VERIFICATION_CODE_SECRET
    );

    const resetLink = `${process.env.FRONTEND_BASE_URL}/auth/reset-password/${hashedCodeValue}?email=${user.email}`;
    const emailUsername = user.firstName.charAt(0).toUpperCase() + ``;
    user.firstName.slice(1).toLowerCase();

    let info = await transport.sendMail({
      from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
      to: user.email,
      subject: "Shophoria Password Reset",
      html: emailTemplate(emailUsername, resetLink),
    });

    if (info.accepted[0] === user.email) {
      user.forgotPasswordCode = hashedCodeValue;
      user.forgotPasswordCodeValidation = Date.now();
      await user.save();
      return APIResponseHandler(
        res,
        true,
        200,
        "Reset link sent! Please check your email"
      );
    }
    APIResponseHandler(
      res,
      false,
      200,
      "Reset password reqest failed! Please try again"
    );
  }
}

export default new UserService();
