import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      require: [true, "First name is required"],
    },
    lastName: {
      type: String,
      require: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      trim: true,
      unique: [true, "Email must be unique!"],
      minLength: [5, "Email must have 5 characters"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password must be provided"],
      trim: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
