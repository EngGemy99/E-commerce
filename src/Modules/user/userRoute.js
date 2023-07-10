import express from "express";

import {
  changeUserPassword,
  createUser,
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "./userController.js";

import { validation } from "../../Middlewares/validation.js";
import {
  changeUserPasswordSchema,
  createUserSchema,
  deleteUserSchema,
  getUserSchema,
  updateUserSchema,
} from "../../Middlewares/Validations/userValidation.js";
import { protectedRoutes } from "../../utils/ProtectedRoutes.js";

let router = express.Router();

router
  .route("/")
  .get(getAllUser)
  .post(validation(createUserSchema), createUser);
router
  .route("/:id")
  .get(validation(getUserSchema), getUser)
  .delete(validation(deleteUserSchema), deleteUser)
  .patch(validation(updateUserSchema), updateUser);
router
  .route("/changeUserPassword/:id")
  .patch(validation(changeUserPasswordSchema), changeUserPassword);

export default router;
