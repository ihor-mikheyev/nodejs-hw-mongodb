import { Router } from 'express';

import * as authController from '../controllers/auth.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';

import { authSingInSchema, authSingUpSchema } from '../validation/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(authSingUpSchema),
  ctrlWrapper(authController.singUpController),
);

authRouter.post(
  '/login',
  validateBody(authSingInSchema),
  ctrlWrapper(authController.singInController),
);

authRouter.post('/logout', ctrlWrapper(authController.logoutUserController));

authRouter.post(
  '/refresh',
  ctrlWrapper(authController.refreshUserSessionController),
);

export default authRouter;
