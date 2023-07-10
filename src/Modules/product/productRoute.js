import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  updateProduct,
} from "./productController.js";
import { uploadMixFile } from "../../utils/FileUpload.js";
import { allowedTo } from "../../utils/allowedTo.js";
import { protectedRoutes } from "../../utils/ProtectedRoutes.js";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "../../Middlewares/Validations/productValidation.js";
import { validation } from "../../Middlewares/validation.js";

let fieldsArray = [
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 8 },
];
let router = express.Router();

router
  .route("/")
  .get(getAllProduct)
  .post(
    protectedRoutes,
    allowedTo("admin", "user"),
    uploadMixFile(fieldsArray, "products"),
    validation(createProductSchema),
    createProduct
  );
router
  .route("/:id")
  .get(validation(getProductSchema), getProduct)
  .delete(
    protectedRoutes,
    allowedTo("admin"),
    validation(deleteProductSchema),
    deleteProduct
  )
  .patch(
    protectedRoutes,
    allowedTo("admin"),
    validation(updateProductSchema),
    updateProduct
  );
export default router;
