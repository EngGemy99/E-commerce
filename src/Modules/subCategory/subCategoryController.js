import slugify from "slugify";
import { ErrorMessage } from "../../utils/ErrorMessage.js";
import { catchError } from "../../utils/catchAsyncError.js";
import { subCategoryModel } from "./subCategoryModel.js";

const createSubCategory = catchError(async (request, response, next) => {
  let { name, category } = request.body;
  let result = new subCategoryModel({
    name,
    category,
    slug: slugify(name),
  });
  await result.save();
  response.status(201).json({
    message: "Add New Category Successfully 😃",
    result,
  });
});

const getAllSubCategories = catchError(async (request, response, next) => {
  let filter = {};
  if (request.params.categoryId) {
    filter = { category: request.params.categoryId };
  }
  let result = await subCategoryModel.find(filter);
  response.status(200).json({
    message: "Done 😃",
    result,
  });
});
const getSubCategory = catchError(async (request, response, next) => {
  let { id } = request.params;
  let result = await subCategoryModel.findById(id);
  if (!result) {
    return next(ErrorMessage(404, `subCategory Not Found 😥`));
  }
  response.status(200).json({
    message: "Done 😃",
    result,
  });
});
const updateSubCategory = catchError(async (request, response, next) => {
  let { id } = request.params;
  let { name, category } = request.body;
  let result = await subCategoryModel.findByIdAndUpdate(
    id,
    {
      name,
      category,
      slug: slugify(name),
    },
    { new: true }
  );
  if (!result) {
    return next(ErrorMessage(404, `subCategory Not Found 😥`));
  }
  response.status(200).json({
    message: "Done 😃",
    result,
  });
});

const deleteSubCategory = catchError(async (request, response, next) => {
  let { id } = request.params;
  let result = await subCategoryModel.findByIdAndDelete(id);
  if (!result) {
    return next(ErrorMessage(404, `sub Category Not Found 😥`));
  }
  response.status(200).json({
    message: "Delete Successfully 🤝",
  });
});
const getAllSubCategoryToSpecificCategory = catchError(
  async (request, response, next) => {
    let { id } = request.params;
    let result = await subCategoryModel.findByIdAndDelete(id);
    if (!result) {
      return next(ErrorMessage(404, `sub Category Not Found 😥`));
    }
    response.status(200).json({
      message: "Delete Successfully 🤝",
    });
  }
);

export {
  createSubCategory,
  getAllSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getAllSubCategoryToSpecificCategory,
};
