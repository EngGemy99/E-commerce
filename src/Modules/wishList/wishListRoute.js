import express from "express";
import { allowedTo } from "../../utils/allowedTo.js";
import { protectedRoutes } from "../../utils/ProtectedRoutes.js";
import {
  addToWishList,
  removeFromWishList,
  getAllUserWishList,
} from "./wishListController.js";
let router = express.Router();

router
  .route("/")
  .patch(protectedRoutes, allowedTo("user"), addToWishList)
  .delete(protectedRoutes, allowedTo("user"), removeFromWishList)
  .get(protectedRoutes, allowedTo("user"), getAllUserWishList);
export default router;
