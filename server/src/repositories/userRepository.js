import User from "../models/userModel.js";

class UserRepository {
  async createUser(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async loginByEmail(email) {
    return await User.findOne({ email }).select("+password");
  }

  async updateUser(userId, updateData) {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
  }

  async deleteUser(userId) {
    return await User.findByIdAndDelete(userId);
  }

  async getAllUser() {
    return await User.find();
  }
}

export default new UserRepository();
