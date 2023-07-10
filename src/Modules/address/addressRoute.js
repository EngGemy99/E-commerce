import express from "express";
import { allowedTo } from "../../utils/allowedTo.js";
import { protectedRoutes } from "../../utils/ProtectedRoutes.js";
import {
  addToAddress,
  getAllUserAddress,
  removeFromAddress,
} from "./addressController.js";
import { validation } from "../../Middlewares/validation.js";
import { updateUserSchema } from "../../Middlewares/Validations/userValidation.js";

let router = express.Router();

router
  .route("/")
  .patch(
    protectedRoutes,
    validation(updateUserSchema),
    allowedTo("user"),
    addToAddress
  )
  .delete(protectedRoutes, allowedTo("user"), removeFromAddress)
  .get(protectedRoutes, allowedTo("user"), getAllUserAddress);
export default router;
