import express from "express";
import contactsControllers from "../../controllers/contacts-controllers.js";

import {
  authenticate,
  isEmptyBody,
  isEmptyOneFieldBody,
  isValidId,
} from "../../middlewares/index.js";

import { validateBody, validateParams } from "../../decorators/index.js";
import {
  createContactSchema,
  updateContactSchema,
  contactFavoriteScheme,
  filterContactScheme,
} from "../../models/Contact.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get(
  "/",
  validateParams(filterContactScheme),
  contactsControllers.getAllContacts
);

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
