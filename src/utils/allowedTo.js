import { ErrorMessage } from "./ErrorMessage.js";
import { catchError } from "./catchAsyncError.js";

const allowedTo = (...roles) => {
  return catchError(async (request, response, next) => {
    if (!roles.includes(request.user.role)) {
      return next(
        ErrorMessage(
          401,
          `Not Authorized To Access This Route You Are ${request.user.role}`
        )
      );
    }
    next();
  });
};

export { allowedTo };
