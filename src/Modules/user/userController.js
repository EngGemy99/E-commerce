import { ErrorMessage } from "../../utils/ErrorMessage.js";
import { catchError } from "../../utils/catchAsyncError.js";
import { userModel } from "./userModel.js";
import { deleteOne } from "../../utils/factory.js";
import { ApiFeature } from "../../utils/ApiFeature.js";

const createUser = catchError(async (request, response, next) => {
  let user = await userModel.findOne({ email: request.body.email });
  if (user) return next(ErrorMessage(409, "Account Already Exist 🙄"));
  let result = new userModel(request.body);
  await result.save();
  response.status(201).json({
    message: "Add New User Successfully 😃",
    result,
  });
});

const getAllUser = catchError(async (request, response, next) => {
  let apiFeature = new ApiFeature(userModel.find(), request.query)
    .paginate()
    .filter()
    .fields()
    .search()
    .sort();
  //? execute query
  let result = await apiFeature.mongooseQuery;
  response.status(200).json({
    message: "Done 😃",
    result,
  });
});
const getUser = catchError(async (request, response, next) => {
  let { id } = request.params;
  let result = await userModel.findById(id);
  if (!result) {
    return next(ErrorMessage(404, `User Not Found 😥`));
  }
  console.log(result);
  response.status(200).json({
    message: "Done 😃",
    result,
  });
});
const updateUser = catchError(async (request, response, next) => {
  let { id } = request.params;
  let result = await userModel.findByIdAndUpdate(id, request.body, {
    new: true,
  });
  if (!result) {
    return next(ErrorMessage(404, `User Not Found 😥`));
  }
  response.status(200).json({
    message: "Done 😃",
    result,
  });
});
const changeUserPassword = catchError(async (request, response, next) => {
  let { id } = request.params;
  request.body.changePasswordAt = Date.now();
  let result = await userModel.findByIdAndUpdate(id, request.body, {
    new: true,
  });
  if (!result) {
    return next(ErrorMessage(404, `User Not Found 😥`));
  }
  response.status(200).json({
    message: "Done 😃",
    result,
  });
});
const deleteUser = deleteOne(userModel);

export {
  createUser,
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
  changeUserPassword,
};
