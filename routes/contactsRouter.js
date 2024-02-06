import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";

import { isEmptyBody, isEmptyOneFieldBody } from "../middlewares/index.js";
import { validateBody } from "../decorators/index.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:id", contactsControllers.getOneContact);

contactsRouter.delete("/:id", contactsControllers.deleteContact);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(createContactSchema),
  contactsControllers.createContact
);

contactsRouter.put(
  "/:id",
  isEmptyOneFieldBody,
  validateBody(updateContactSchema),
  contactsControllers.updateContact
);

export default contactsRouter;
