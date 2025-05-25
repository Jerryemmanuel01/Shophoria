import userRepository from "../repositories/userRepository.js";

class UserService {
  async registerUser(data) {
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) throw new Error("Email already registered");

    return await userRepository.createUser(data)
  }
}

export default new UserService()