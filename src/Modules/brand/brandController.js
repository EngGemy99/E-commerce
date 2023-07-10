import slugify from "slugify";
import { ErrorMessage } from "../../utils/ErrorMessage.js";
import { catchError } from "../../utils/catchAsyncError.js";
import { brandModel } from "./brandModel.js";
import { deleteOne } from "../../utils/factory.js";
import { ApiFeature } from "../../utils/ApiFeature.js";

const createBrand = catchError(async (request, response, next) => {
  request.body.logo = request.file.filename;
  request.body.slug = slugify(request.body.name);
  let result = new brandModel(request.body);
  await result.save();
  response.status(201).json({
    message: "Add New Brand Successfully 😃",
    result,
  });
});

const getAllBrand = catchError(async (request, response, next) => {
  let apiFeature = new ApiFeature(brandModel.find(), request.query)
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
const getBrand = catchError(async (request, response, next) => {
  let { id } = request.params;
  let result = await brandModel.findById(id);
  if (!result) {
    return next(ErrorMessage(404, `Brand Not Found 😥`));
  }
  response.status(200).json({
    message: "Done 😃",
    result,
  });
});
const updateBrand = catchError(async (request, response, next) => {
  let { id } = request.params;
  request.body.logo = request.file.filename;
  request.body.slug = slugify(request.body.name);
  let result = await brandModel.findByIdAndUpdate(id, request.body, {
    new: true,
  });
  if (!result) {
    return next(ErrorMessage(404, `Brand Not Found 😥`));
  }
  response.status(200).json({
    message: "Done 😃",
    result,
  });
});
const deleteBrand = deleteOne(brandModel);

export { createBrand, getAllBrand, getBrand, updateBrand, deleteBrand };
