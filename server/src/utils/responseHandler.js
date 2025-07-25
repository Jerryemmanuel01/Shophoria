import { logErrorToFile } from "./errorLogger.js";

export function APIResponseHandler(
  res,
  success,
  statusCode = 400,
  message = "Error! Please try again later.",
  data,
  token
) {
  if (success) return successResponse(res, statusCode, message, data, token);
  return errorResponse(res, statusCode, message, data);
}

export function successResponse(res, statusCode, message, data, token) {
  res.status(statusCode).json({
    success: true,
    ...(message && { message }),
    ...(data && { data }),
    ...(token && { token }),
  });
}

export function errorResponse(res, statusCode, message, data) {
  res.status(statusCode).json({
    success: false,
    ...(message && { message }),
    ...(data && { data }),
  });
}

export function ExpressErrors(err, req, res, next) {
  logErrorToFile(err);

  if (err.name === "ValidationError") {
    return errorResponse(res, 422, err.message);
  }
  if (err.name === "CastError") {
    return errorResponse(res, 422, "Invalid ID");
  }
  if (err.name === "JsonWebTokenError") {
    return errorResponse(res, 401, "Invalid token");
  }
  if (err.name === "TokenExpiredError") {
    return errorResponse(res, 401, "Token expired");
  }
  return APIResponseHandler(res, false, 500, err.message);
}
