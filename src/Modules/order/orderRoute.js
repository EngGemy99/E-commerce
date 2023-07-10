import express from "express";

import { allowedTo } from "../../utils/allowedTo.js";
import { protectedRoutes } from "../../utils/ProtectedRoutes.js";
import {
  createCashOrder,
  createCheckOutSession,
  getAllOrder,
  getUserOrder,
} from "./orderController.js";
let router = express.Router();

router.route("/:id").post(protectedRoutes, allowedTo("user"), createCashOrder);
router.route("/").get(protectedRoutes, allowedTo("user"), getUserOrder);
router.route("/all").get(protectedRoutes, allowedTo("admin"), getAllOrder);

router
  .route("/checkOut/:id")
  .post(protectedRoutes, allowedTo("user"), createCheckOutSession);
export default router;
