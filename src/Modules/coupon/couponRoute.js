import express from "express";
import {
  createCoupon,
  deleteCoupon,
  getAllCoupon,
  getCoupon,
  updateCoupon,
} from "./couponController.js";
import { allowedTo } from "../../utils/allowedTo.js";
import { protectedRoutes } from "../../utils/ProtectedRoutes.js";
import { validation } from "../../Middlewares/validation.js";
import {
  createCouponSchema,
  deleteCouponSchema,
  getCouponSchema,
  updateCouponSchema,
} from "../../Middlewares/Validations/couponValidation.js";
let router = express.Router();

router
  .route("/")
  .get(getAllCoupon)
  .post(
    protectedRoutes,
    allowedTo("admin", "user"),
    validation(createCouponSchema),
    createCoupon
  );
router
  .route("/:id")
  .get(validation(getCouponSchema), getCoupon)
  .delete(
    protectedRoutes,
    allowedTo("admin", "user"),
    validation(deleteCouponSchema),
    deleteCoupon
  )
  .patch(
    protectedRoutes,
    allowedTo("admin", "user"),
    validation(updateCouponSchema),
    updateCoupon
  );
export default router;
