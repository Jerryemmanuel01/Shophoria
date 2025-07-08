import { validationResult } from "express-validator";
import { createHmac } from "node:crypto";

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

export const hmacProcess = (value, key) => {
  const result = createHmac("sha256", key).update(value).digest("hex");
  return result;
};
