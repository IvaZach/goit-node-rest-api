import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.base": `"name" should be a type of 'text'`,
    "string.empty": `"name" cannot be an empty field`,
    "string.min": `"name" should have a minimum length of {#limit}`,
    "any.required": `"name" is a required field`,
  }),
  email: Joi.string().trim().min(6).email().required().messages({
    "string.base": `"email" should be a type of 'text'`,
    "string.empty": `"email" cannot be an empty field`,
    "string.min": `"email" should have a minimum length of {#limit}`,
    "any.required": `"email" is a required field`,
  }),
  phone: Joi.string().min(6).max(16).required().messages({
    "string.base": `"phone" should be a type of 'number'`,
    "string.empty": `"phone" cannot be an empty field`,
    "string.min": `"phone" should have a minimum length of {#limit}`,
    "any.required": `"phone" is a required field`,
  }),
});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(2).messages({
        "string.base": `"name" should be a type of 'text'`,
        "string.empty": `"name" cannot be an empty field`,
        "string.min": `"name" should have a minimum length of {#limit}`,
        "any.required": `"name" is a required field`,
      }),
    email: Joi.string().trim().min(6).email().messages({
        "string.base": `"email" should be a type of 'text'`,
        "string.empty": `"email" cannot be an empty field`,
        "string.min": `"email" should have a minimum length of {#limit}`,
        "any.required": `"email" is a required field`,
      }),
    phone: Joi.string().min(6).max(16).messages({
        "string.base": `"phone" should be a type of 'number'`,
        "string.empty": `"phone" cannot be an empty field`,
        "string.min": `"phone" should have a minimum length of {#limit}`,
        "any.required": `"phone" is a required field`,
      })
});
