import express from "express";

import { allowedTo } from "../../utils/allowedTo.js";
import { protectedRoutes } from "../../utils/ProtectedRoutes.js";
import {
  addProductToCart,
  getUserCart,
  removeAllCopyProductFromCart,
  removeProductFromCart,
  applyCoupon,
} from "./cartController.js";
let router = express.Router();

router
  .route("/")
  .delete(protectedRoutes, allowedTo("user"), removeProductFromCart)
  .post(protectedRoutes, allowedTo("user"), addProductToCart)
  .get(protectedRoutes, allowedTo("user"), getUserCart);
router
  .route("/applyCoupon")
  .patch(protectedRoutes, allowedTo("user"), applyCoupon);

router
  .route("/:product")
  .delete(protectedRoutes, allowedTo("user"), removeAllCopyProductFromCart);
export default router;
