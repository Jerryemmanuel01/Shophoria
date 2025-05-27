import userRepository from "../repositories/userRepository.js";
import { APIResponseHandler } from "../utils/responseHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class UserService {
  async signup(res, data) {
    const { password, ...userData } = data;

    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      return APIResponseHandler(res, false, 400, "Email has been used!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userInfo = { ...userData, password: hashedPassword };

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
  }

  // Login
  async login(res, email, password) {
    const user = await userRepository.loginByEmail(email);
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
}

export default new UserService();
