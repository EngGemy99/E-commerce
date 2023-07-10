import Joi from "joi";

const createProductSchema = Joi.object({
  title: Joi.string().min(2).max(20).trim().required(),
  price: Joi.number().required(),
  priceAfterDiscount: Joi.number().min(0),
  ratingAvg: Joi.number().min(1).max(5),
  rateCount: Joi.number().min(0),
  description: Joi.string().min(2).max(200).trim().required(),
  quantity: Joi.number().min(0).required(),
  sold: Joi.number().min(0),
  imageCover: Joi.string().uri().optional(),
  images: Joi.array().items(Joi.string().required()),
  category: Joi.string().hex().length(24).required(),
  subCategory: Joi.string().hex().length(24).required(),
  brand: Joi.string().hex().length(24).required(),
});
const getProductSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
const deleteProductSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
const updateProductSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
export {
  createProductSchema,
  getProductSchema,
  deleteProductSchema,
  updateProductSchema,
};
