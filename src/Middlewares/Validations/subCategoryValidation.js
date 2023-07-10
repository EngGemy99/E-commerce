import Joi from "joi";

const createSubCategorySchema = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  category: Joi.string().hex().length(24).required(),
});

const getSubCategorySchema = Joi.object({
  // to check it objectId
  id: Joi.string().hex().length(24).required(),
});
const updateSubCategorySchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  name: Joi.string().min(2).max(20).optional(),
  category: Joi.string().hex().length(24).optional(),
});
const deleteSubCategorySchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export {
  createSubCategorySchema,
  getSubCategorySchema,
  updateSubCategorySchema,
  deleteSubCategorySchema,
};
