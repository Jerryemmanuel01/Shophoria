import { body } from "express-validator";

/* ---------- 1. register ---------- */
export const registerValidation = [
  body("firstName")
    .escape()
    .notEmpty()
    .withMessage("First name is required")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be between 2 – 50 characters"),

  body("lastName")
    .escape()
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be between 2 – 50 characters"),

  body("email")
    .escape()
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),

  body("password")
    .escape()
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must contain at least one special character"),

  body("confirmPassword")
    .escape()
    .trim()
    .notEmpty()
    .withMessage("Confirm Password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password do not match");
      }
      return true;
    }),

  body("phone")
    .escape()
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^\+?[0-9]{7,15}$/)
    .withMessage("Invalid phone number format"),

  body("address")
    .escape()
    .trim()
    .notEmpty()
    .withMessage("Address is required")
    .isLength({ min: 5, max: 100 })
    .withMessage("Address must be between 5 – 100 characters"),
];

/* ---------- 2. login ---------- */
export const loginValidation = [
  body("email").isEmail().withMessage("Invalid email address"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain an uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain a lowercase letter")
    .matches(/\d/)
    .withMessage("Password must contain a number")
    .matches(/[\W_]/)
    .withMessage("Password must contain a special character"),
];

/* ---------- 3. forget-password ---------- */
export const forgetPasswordValidation = [
  body("email").isEmail().withMessage("Invalid email format"),
];

/* ---------- 4. reset-password ---------- */
export const resetPasswordValidation = [
  body("email").isEmail().withMessage("Invalid email format"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("confirmPassword")
    .isLength({ min: 6 })
    .withMessage("Confirm Password must be at least 6 characters")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];
