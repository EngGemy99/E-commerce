import express from "express";

import {
  createBrand,
  deleteBrand,
  getAllBrand,
  getBrand,
  updateBrand,
} from "./brandController.js";
import {
  createBrandSchema,
  deleteBrandSchema,
  getBrandSchema,
  updateBrandSchema,
} from "../../Middlewares/Validations/brandValidation.js";
import { validation } from "../../Middlewares/validation.js";
import { uploadSingleFile } from "../../utils/FileUpload.js";
import { allowedTo } from "../../utils/allowedTo.js";
import { protectedRoutes } from "../../utils/ProtectedRoutes.js";

let router = express.Router();

router
  .route("/")
  .get(getAllBrand)
  .post(
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleFile("logo", "brand"),
    validation(createBrandSchema),
    createBrand
  );
router
  .route("/:id")
  .get(validation(getBrandSchema), getBrand)
  .delete(
    protectedRoutes,
    allowedTo("admin"),
    validation(deleteBrandSchema),
    deleteBrand
  )
  .patch(
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleFile("logo", "brand"),
    validation(updateBrandSchema),
    updateBrand
  );
export default router;
