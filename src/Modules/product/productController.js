import slugify from "slugify";
import { ErrorMessage } from "../../utils/ErrorMessage.js";
import { catchError } from "../../utils/catchAsyncError.js";
import { productModel } from "./productModel.js";
import { deleteOne } from "../../utils/factory.js";
import { ApiFeature } from "../../utils/ApiFeature.js";

const createProduct = catchError(async (request, response, next) => {
  request.body.slug = slugify(request.body.title);
  request.body.imageCover = request.files.imageCover[0].filename;
  request.body.images = request.files.images.map((img) => {
    return img.filename;
  });
  let result = new productModel(request.body);
  await result.save();
  response.status(201).json({
    message: "Add New Product Successfully 😃",
    result,
  });
});

const getAllProduct = catchError(async (request, response, next) => {
  let apiFeature = new ApiFeature(productModel.find(), request.query)
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
    page: apiFeature.page,
  });
});
const getProduct = catchError(async (request, response, next) => {
  let { id } = request.params;
  let result = await productModel.findById(id);
  if (!result) {
    return next(ErrorMessage(404, `Product Not Found 😥`));
  }
  response.status(200).json({
    message: "Done 😃",
    result,
  });
});
const updateProduct = catchError(async (request, response, next) => {
  let { id } = request.params;
  if (request.body.title) request.body.slug = slugify(request.body.title);
  let result = await productModel.findByIdAndUpdate(id, request.body, {
    new: true,
  });
  if (!result) {
    return next(ErrorMessage(404, `Product Not Found 😥`));
  }
  response.status(200).json({
    message: "Done 😃",
    result,
  });
});
const deleteProduct = deleteOne(productModel);

export {
  createProduct,
  getAllProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};

// match;
// بتكون شايله القيمه الي مكتوبه
