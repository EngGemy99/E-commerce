import { ErrorMessage } from "../../utils/ErrorMessage.js";
import { catchError } from "../../utils/catchAsyncError.js";
import { couponModel } from "../coupon/couponModel.js";
import { deleteOne } from "../../utils/factory.js";
import { ApiFeature } from "../../utils/ApiFeature.js";
import qrcode from "qrcode";

const createCoupon = catchError(async (request, response, next) => {
  let result = new couponModel(request.body);
  await result.save();
  response.status(201).json({
    message: "Add New Coupon Successfully 😃",
    result,
  });
});

const getAllCoupon = catchError(async (request, response, next) => {
  let apiFeature = new ApiFeature(couponModel.find(), request.query)
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
const getCoupon = catchError(async (request, response, next) => {
  let { id } = request.params;
  let result = await couponModel.findById(id);
  if (!result) {
    return next(ErrorMessage(404, `Coupon Not Found 😥`));
  }
  let url = await qrcode.toDataURL(result.code);
  response.status(200).json({
    result,
    url,
  });
});
const updateCoupon = catchError(async (request, response, next) => {
  let { id } = request.params;
  let result = await couponModel.findOneAndUpdate({ _id: id }, request.body, {
    new: true,
  });
  if (!result) {
    return next(ErrorMessage(404, `Coupon Not Found or not own Coupon 😥`));
  }
  response.status(200).json({
    message: "Done 😃",
    result,
  });
});
const deleteCoupon = deleteOne(couponModel);

export { createCoupon, getAllCoupon, getCoupon, updateCoupon, deleteCoupon };
