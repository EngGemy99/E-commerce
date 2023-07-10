import Joi from "joi";

const createCategorySchema = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  image: Joi.string().uri().optional(),
});
const getCategorySchema = Joi.object({
  // to check it objectId
  id: Joi.string().hex().length(24).required(),
});
const updateCategorySchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  name: Joi.string().min(2).max(20),
  image: Joi.string().uri().optional(),
});
const deleteCategorySchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export {
  createCategorySchema,
  getCategorySchema,
  updateCategorySchema,
  deleteCategorySchema,
};
