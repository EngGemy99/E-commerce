import slugify from "slugify";
import { categoryModel } from "./categoryModel.js";
import { ErrorMessage } from "../../utils/ErrorMessage.js";
import { catchError } from "../../utils/catchAsyncError.js";
import { ApiFeature } from "../../utils/ApiFeature.js";

const createCategory = catchError(async (request, response, next) => {
  request.body.image = request.file.filename;
  request.body.slug = slugify(request.body.name);
  let newCategory = new categoryModel(request.body);
  await newCategory.save();
  response.status(201).json({
    message: "Add New Category Successfully 😃",
    newCategory,
  });
});

const getAllCategories = catchError(async (request, response, next) => {
  let apiFeature = new ApiFeature(categoryModel.find(), request.query)
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
const getCategory = catchError(async (request, response, next) => {
  let { id } = request.params;
  let result = await categoryModel.findById(id);
  if (!result) {
    return next(ErrorMessage(404, `Category Not Found 😥`));
  }
  response.status(200).json({
    message: "Done 😃",
    result,
  });
});
const updateCategory = catchError(async (request, response, next) => {
  let { id } = request.params;
  request.body.image = request.file.filename;
  request.body.slug = slugify(request.body.name);
  let result = await categoryModel.findByIdAndUpdate(id, request.body, {
    new: true,
  });
  if (!result) {
    return next(ErrorMessage(404, `Category Not Found 😥`));
  }
  response.status(200).json({
    message: "Done 😃",
    result,
  });
});
const deleteCategory = catchError(async (request, response, next) => {
  let { id } = request.params;
  let result = await categoryModel.findByIdAndDelete(id);
  if (!result) {
    return next(ErrorMessage(404, `Category Not Found 😥`));
  }
  response.status(200).json({
    message: "Delete Successfully 🤝",
  });
});

export {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
