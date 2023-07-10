import express from "express";
import {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getSubCategory,
  updateSubCategory,
} from "./subCategoryController.js";
import {
  createSubCategorySchema,
  deleteSubCategorySchema,
  getSubCategorySchema,
  updateSubCategorySchema,
} from "../../Middlewares/Validations/subCategoryValidation.js";
import { validation } from "../../Middlewares/validation.js";
import { protectedRoutes } from "../../utils/ProtectedRoutes.js";

let router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getAllSubCategories)
  .post(
    protectedRoutes,
    validation(createSubCategorySchema),
    createSubCategory
  );
router
  .route("/:id")
  .get(protectedRoutes, validation(getSubCategorySchema), getSubCategory)
  .delete(
    protectedRoutes,
    validation(deleteSubCategorySchema),
    deleteSubCategory
  )
  .patch(
    protectedRoutes,
    validation(updateSubCategorySchema),
    updateSubCategory
  );

export default router;
