import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError, preUpdate } from "./hooks.js";

const phoneRegexp = /^\(?\d{3}\) ?\d{3}-?\d{4}/;
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      minLength: 2,
    },
    email: {
      type: String,
      required: true,
      match: emailRegexp,
      minLength: 6,
    },
    phone: {
      type: String,
      required: true,
      match: phoneRegexp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveError);

contactSchema.pre("findOneAndUpdate", preUpdate);

contactSchema.post("findOneAndUpdate", handleSaveError);

export const createContactSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.base": `"name" should be a type of 'text'`,
    "string.empty": `"name" cannot be an empty field`,
    "string.min": `"name" should have a minimum length of {#limit}`,
    "any.required": `"name" is a required field`,
  }),
  email: Joi.string().trim().min(6).pattern(emailRegexp).required().messages({
    "string.base": `"email" should be a type of 'text'`,
    "string.empty": `"email" cannot be an empty field`,
    "string.min": `"email" should have a minimum length of {#limit}`,
    "any.required": `"email" is a required field`,
  }),
  phone: Joi.string().trim().pattern(phoneRegexp).required().messages({
    "string.empty": `"phone" cannot be an empty field`,
    "any.required": `"phone" is a required field`,
  }),
  favorite: Joi.boolean().messages({
    "string.empty": `"favorite" cannot be an empty field`,
  }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(2).messages({
    "string.base": `"name" should be a type of 'text'`,
    "string.empty": `"name" cannot be an empty field`,
    "string.min": `"name" should have a minimum length of {#limit}`,
    "any.required": `"name" is a required field`,
  }),
  email: Joi.string().trim().min(6).pattern(emailRegexp).messages({
    "string.base": `"email" should be a type of 'text'`,
    "string.empty": `"email" cannot be an empty field`,
    "string.min": `"email" should have a minimum length of {#limit}`,
    "any.required": `"email" is a required field`,
  }),
  phone: Joi.string().trim().pattern(phoneRegexp).messages({
    "string.empty": `"phone" cannot be an empty field`,
    "any.required": `"phone" is a required field`,
  }),
  favorite: Joi.boolean().messages({
    "string.empty": `"favorite" cannot be an empty field`,
  }),
});

export const contactFavoriteScheme = Joi.object({
  favorite: Joi.boolean().required().messages({
    "string.empty": `"favorite" cannot be an empty field`,
  }),
});

const Contact = model("contact", contactSchema);

export default Contact;
