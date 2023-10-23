import Joi = require("joi");

export const userScema = Joi.object({
  username: Joi.string().required().min(3).max(30),
  full_name: Joi.string().required().min(4),
  email: Joi.string().required().min(10),
  password: Joi.string().required().min(4).max(30),
  id: Joi.number(),
  profile_picture: Joi.string(),
  profile_background: Joi.string(),
  profile_description: Joi.string(),
});

export const userScemaUpdate = Joi.object({
  username: Joi.string().min(3).max(30),
  full_name: Joi.string().min(4),
  email: Joi.string().min(10),
  password: Joi.string().min(4).max(30),
  id: Joi.number(),
  profile_picture: Joi.string(),
  profile_background: Joi.string(),
  profile_description: Joi.string(),
});
