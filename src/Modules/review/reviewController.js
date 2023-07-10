import slugify from "slugify";
import { ErrorMessage } from "../../utils/ErrorMessage.js";
import { catchError } from "../../utils/catchAsyncError.js";
import { reviewModel } from "./reviewModel.js";
import { deleteOne } from "../../utils/factory.js";
import { ApiFeature } from "../../utils/ApiFeature.js";

const createReview = catchError(async (request, response, next) => {
  //? check if user make comment or not
  let isReview = await reviewModel.findOne({
    user: request.user._id,
    product: request.body.product,
  });
  if (isReview)
    return next(ErrorMessage(409, "You Already Review This Product 🤔"));
  request.body.user = request.user._id;
  let result = new reviewModel(request.body);
  await result.save();
  response.status(201).json({
    message: "Add New review Successfully 😃",
    result,
  });
});

const getAllReview = catchError(async (request, response, next) => {
  let apiFeature = new ApiFeature(reviewModel.find(), request.query)
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
const getReview = catchError(async (request, response, next) => {
  let { id } = request.params;
  let result = await reviewModel.findById(id);
  if (!result) {
    return next(ErrorMessage(404, `review Not Found 😥`));
  }
  response.status(200).json({
    result,
  });
});
const updateReview = catchError(async (request, response, next) => {
  let { id } = request.params;
  let result = await reviewModel.findOneAndUpdate(
    { _id: id, user: request.user._id },
    request.body,
    {
      new: true,
    }
  );
  if (!result) {
    return next(ErrorMessage(404, `review Not Found or not own review 😥`));
  }
  response.status(200).json({
    message: "Done 😃",
    result,
  });
});
const deleteReview = deleteOne(reviewModel);

export { createReview, getAllReview, getReview, updateReview, deleteReview };

//دي احسن  كشكل بس مش كود
// const updateReview = catchError(async (request, response, next) => {
//   let { id } = request.params;
//   let isUserReview = await reviewModel.findById(id);

//   if (!isUserReview.user.equals(request.user._id)) {
//     return next(ErrorMessage(401, `this is not your review 😥`));
//   }
//   let result = await reviewModel.findByIdAndUpdate(id, request.body, {
//     new: true,
//   });
//   if (!result) {
//     return next(ErrorMessage(404, `review Not Found 😥`));
//   }
//   response.status(200).json({
//     message: "Done 😃",
//     result,
//   });
// });
