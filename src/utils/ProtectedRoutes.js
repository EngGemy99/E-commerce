import { userModel } from "../Modules/user/userModel.js";
import { ErrorMessage } from "./ErrorMessage.js";
import { catchError } from "./catchAsyncError.js";
import jwt from "jsonwebtoken";
const protectedRoutes = catchError(async (request, response, next) => {
  //! [1] check if send token
  if (!request.headers.authorization)
    return next(ErrorMessage(401, "Not Authorize"));
  let token = request.headers.authorization.split(" ")[1];
  if (!token) return next(ErrorMessage(401, "Token Not Provided"));
  //! [2] check if token valid or not
  let decoded = await jwt.verify(token, process.env.SECRET_KEY);
  //! [3] check if user in db or not
  let user = await userModel.findById(decoded.userId);
  if (!user) return next(ErrorMessage(401, "Invalid Token"));
  //! [4] when user change password compare time
  if (user.changePasswordAt) {
    let changePasswordDate = parseInt(user.changePasswordAt.getTime() / 1000);
    if (changePasswordDate > decoded.iat)
      return next(ErrorMessage(401, "Password Changed"));
  }
  //! to send user for next middleware (allowedTo) to check on user.role
  request.user = user;
  next();
});

export { protectedRoutes };
