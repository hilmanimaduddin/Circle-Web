import Joi = require("joi");

export const userScema = Joi.object({
  password: Joi.string().min(3).max(300),
});
