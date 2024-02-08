import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";

import {
  isEmptyBody,
  isEmptyOneFieldBody,
  isValidId,
} from "../middlewares/index.js";
import { validateBody } from "../decorators/index.js";
import {
  createContactSchema,
  updateContactSchema,
  contactFavoriteScheme,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:id", isValidId, contactsControllers.getOneContact);

contactsRouter.delete("/:id", isValidId, contactsControllers.deleteContact);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(createContactSchema),
  contactsControllers.createContact
);

contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyOneFieldBody,
  validateBody(updateContactSchema),
  contactsControllers.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  isEmptyOneFieldBody,
  validateBody(contactFavoriteScheme),
  contactsControllers.updateStatusContact
);

export default contactsRouter;
