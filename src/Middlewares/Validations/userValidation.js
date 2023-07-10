import Joi from "joi";

const createUserSchema = Joi.object({
  name: Joi.string().min(2).max(20).trim().required(),
  email: Joi.string().trim().required().email(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().max(11).required(),
  profilePic: Joi.string().required(),
  role: Joi.string().valid("user", "admin").required(),
  isActive: Joi.boolean().default(true),
  verified: Joi.boolean().default(false),
  wishList: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
  addresses: Joi.object({
    city: Joi.string().required(),
    street: Joi.string().required(),
    phone: Joi.string()
      .required()
      .pattern(/^[\d\-()+ ]+$/),
  }),
});
const getUserSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
const deleteUserSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
const changeUserPasswordSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  password: Joi.string().min(6),
});

const updateUserSchema = Joi.object({
  id: Joi.string().hex().length(24).optional(),
  name: Joi.string().min(2).max(20).trim(),
  email: Joi.string().trim().email(),
  password: Joi.string().min(6),
  phone: Joi.string().max(11),
  profilePic: Joi.string(),
  role: Joi.string().valid("user", "admin"),
  isActive: Joi.boolean(),
  verified: Joi.boolean(),
  wishList: Joi.array()
    .items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/))
    .optional(),
  addresses: Joi.object({
    city: Joi.string().optional(),
    street: Joi.string().optional(),
    phone: Joi.string()
      .optional()
      .pattern(/^[\d\-()+ ]+$/),
  }).min(1),
});

export {
  createUserSchema,
  getUserSchema,
  deleteUserSchema,
  updateUserSchema,
  changeUserPasswordSchema,
};
