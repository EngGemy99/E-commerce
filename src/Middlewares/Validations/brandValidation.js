import Joi from "joi";

const createBrandSchema = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  logo: Joi.string().uri().optional(),
});
const getBrandSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
const deleteBrandSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
const updateBrandSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  name: Joi.string().min(2).max(20).optional(),
  logo: Joi.string().uri().optional(),
});
export {
  createBrandSchema,
  getBrandSchema,
  deleteBrandSchema,
  updateBrandSchema,
};
