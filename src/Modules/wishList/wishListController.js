import { ErrorMessage } from "../../utils/ErrorMessage.js";
import { catchError } from "../../utils/catchAsyncError.js";
import { userModel } from "../user/userModel.js";
const addToWishList = catchError(async (request, response, next) => {
  let { product } = request.body;
  let result = await userModel.findByIdAndUpdate(
    request.user._id,
    { $addToSet: { wishList: product } },
    { new: true }
  );
  if (!result) {
    return next(ErrorMessage(400, `Product Not Found  😥`));
  }
  response.status(200).json({
    message: "Add To WishList Successfully 😃",
    result: result.wishList,
  });
});
const removeFromWishList = catchError(async (request, response, next) => {
  let { product } = request.body;
  let result = await userModel.findByIdAndUpdate(
    request.user._id,
    { $pull: { wishList: product } },
    { new: true }
  );
  if (!result) {
    return next(ErrorMessage(400, `Product Not Found  😥`));
  }
  response.status(200).json({
    message: "Remove From WishList Successfully 😃",
    result: result.wishList,
  });
});
const getAllUserWishList = catchError(async (request, response, next) => {
  let result = await userModel.findById(request.user._id).populate("wishList");
  if (!result) {
    return next(ErrorMessage(400, `Product Not Found  😥`));
  }
  response.status(200).json({
    message: "Done 😃",
    result: result.wishList,
  });
});

export { addToWishList, removeFromWishList, getAllUserWishList };
