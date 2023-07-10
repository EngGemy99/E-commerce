import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../user/userModel.js";
import { ErrorMessage } from "../../utils/ErrorMessage.js";
import { catchError } from "../../utils/catchAsyncError.js";

const signUp = catchError(async (request, response, next) => {
  let isFound = await userModel.findOne({ email: request.body.email });
  if (isFound) return next(ErrorMessage(409, " email already exists"));
  let user = new userModel(request.body);
  await user.save();
  response.status(200).json({
    message: "Done 👌",
    user,
  });
});
const signIn = catchError(async (request, response, next) => {
  const { email, password } = request.body;
  let isFound = await userModel.findOne({ email });
  const match = await bcrypt.compare(password, isFound.password);
  if (isFound && match) {
    let token = jwt.sign(
      {
        name: isFound.name,
        userId: isFound._id,
        role: isFound.role,
      },
      process.env.SECRET_KEY
    );
    return response.status(200).json({
      message: "Done 👌",
      token,
    });
  }
  next(ErrorMessage(401, "Incorrect Email Or Password 🙄"));
});

export { signUp, signIn };
