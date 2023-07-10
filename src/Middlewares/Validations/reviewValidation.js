import Joi from "joi";

const createReviewSchema = Joi.object({
  comment: Joi.string().min(10).max(100).required(),
  product: Joi.string().hex().length(24).required(),
  ratings: Joi.number().min(0).max(5).required(),
});
const getReviewSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
const deleteReviewSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  user: Joi.string().hex().length(24).required(),
});
const updateReviewSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  comment: Joi.string().min(10).max(100).optional(),
  ratings: Joi.number().min(0).max(5).optional(),
});
export {
  createReviewSchema,
  getReviewSchema,
  deleteReviewSchema,
  updateReviewSchema,
};
