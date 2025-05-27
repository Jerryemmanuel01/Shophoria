import { validationResult } from "express-validator";

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const first = errors.array({ onlyFirstError: true })[0];
    return res.status(400).json({
      success: false,
      path: first.path,
      message: first.msg,
    });
  }
  next();
};
