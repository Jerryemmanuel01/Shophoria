import userRepository from "../repositories/userRepository.js";
import { APIResponseHandler } from "../utils/responseHandler.js";

class UserService {
  async registerUser(res, data) {
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) APIResponseHandler(res, false, 400, "User already exist");

    const newUser = await userRepository.createUser(data);
    if (!newUser) {
      return APIResponseHandler(
        res,
        false,
        400,
        "Error occurred! Please try again"
      );
    }
    return newUser;
  }
}

export default new UserService();
