import Joi from "joi";

const createCouponSchema = Joi.object({
  code: Joi.string().min(2).max(20).required(),
  discount: Joi.number().min(1).required(),
  // expires: Joi.date().required(),
  expires: Joi.date().min("now").required(),
});
const getCouponSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
const deleteCouponSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
const updateCouponSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  code: Joi.string().min(2).max(20).optional(),
  discount: Joi.number().min(1).optional(),
  expires: Joi.date().min("now").optional(),
});
export {
  createCouponSchema,
  getCouponSchema,
  deleteCouponSchema,
  updateCouponSchema,
};
