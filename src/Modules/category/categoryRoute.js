import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "./categoryController.js";
import subCategoryRoute from "../subCategory/sunCategoryRoute.js";
import { validation } from "../../Middlewares/validation.js";
import {
  createCategorySchema,
  deleteCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} from "../../Middlewares/Validations/categoryValidation.js";
import { uploadSingleFile } from "../../utils/FileUpload.js";
import { allowedTo } from "../../utils/allowedTo.js";
import { protectedRoutes } from "../../utils/ProtectedRoutes.js";
let router = express.Router();

router
  .route("/")
  .get(getAllCategories)
  .post(
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleFile("image", "category"),
    validation(createCategorySchema),
    createCategory
  );
router
  .route("/:id")
  .get(validation(getCategorySchema), getCategory)
  .delete(
    protectedRoutes,
    allowedTo("admin"),
    validation(deleteCategorySchema),
    deleteCategory
  )
  .patch(
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleFile("image", "category"),
    validation(updateCategorySchema),
    updateCategory
  );
router.use("/:categoryId/subCategory", subCategoryRoute);
export default router;
