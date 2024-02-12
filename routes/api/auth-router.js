import express from "express";
import authControllers from "../../controllers/auth-controllers.js";

import {
  authenticate,
  isEmptyBody,
  isEmptyOneFieldBody,
} from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  userRegisterSchema,
  userLoginSchema,
  userSubscriptionSchema,
} from "../../models/User.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(userRegisterSchema),
  authControllers.register
);

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(userLoginSchema),
  authControllers.login
);

authRouter.post("/logout", authenticate, authControllers.logout);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.patch(
  "/:userId",
  authenticate,
  isEmptyOneFieldBody,
  validateBody(userSubscriptionSchema),
  authControllers.changeSubscription
);

export default authRouter;