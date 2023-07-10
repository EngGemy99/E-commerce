import { ErrorMessage } from "../../utils/ErrorMessage.js";
import { catchError } from "../../utils/catchAsyncError.js";
import { userModel } from "../user/userModel.js";
const addToAddress = catchError(async (request, response, next) => {
  let result = await userModel.findByIdAndUpdate(
    request.user._id,
    { $addToSet: { addresses: request.body } },
    { new: true }
  );
  if (!result) {
    return next(ErrorMessage(400, `User Not Found  😥`));
  }
  response.status(201).json({
    message: "Add To address Successfully 😃",
    result: result.address,
  });
});
const removeFromAddress = catchError(async (request, response, next) => {
  let result = await userModel.findOneAndUpdate(
    {
      _id: request.user._id,
      addresses: {
        $elemMatch: { _id: request.body.address },
      },
    },
    {
      $pull: {
        addresses: { _id: request.body.address },
      },
    }
  );
  if (!result) {
    return next(ErrorMessage(400, `This Address Not Found  😥`));
  }
  response.status(200).json({
    message: "Remove address Successfully 😃",
  });
});
const getAllUserAddress = catchError(async (request, response, next) => {
  let result = await userModel.findById(request.user._id);
  if (!result) {
    return next(ErrorMessage(400, `User Not Found  😥`));
  }
  response.status(200).json({
    message: "Done 😃",
    result: result.addresses,
  });
});

export { addToAddress, removeFromAddress, getAllUserAddress };
