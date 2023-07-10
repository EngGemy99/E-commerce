import express from "express";
import {
  createReview,
  deleteReview,
  getAllReview,
  getReview,
  updateReview,
} from "./reviewController.js";
import {
  createReviewSchema,
  deleteReviewSchema,
  getReviewSchema,
  updateReviewSchema,
} from "../../Middlewares/Validations/reviewValidation.js";
import { allowedTo } from "../../utils/allowedTo.js";
import { protectedRoutes } from "../../utils/ProtectedRoutes.js";
import { validation } from "../../Middlewares/validation.js";
let router = express.Router();

router
  .route("/")
  .get(getAllReview)
  .post(
    protectedRoutes,
    allowedTo("admin", "user"),
    validation(createReviewSchema),
    createReview
  );
router
  .route("/:id")
  .get(validation(getReviewSchema), getReview)
  .delete(
    protectedRoutes,
    allowedTo("admin", "user"),
    validation(deleteReviewSchema),
    deleteReview
  )
  .patch(
    protectedRoutes,
    allowedTo("admin", "user"),
    validation(updateReviewSchema),
    updateReview
  );
export default router;
