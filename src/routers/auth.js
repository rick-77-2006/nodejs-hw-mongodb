import { Router } from 'express';
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
} from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middleware/validateBody.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';

const router = Router();

router.post('/register', validateBody(registerUserSchema), ctrlWrapper(registerUserController));
router.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));
router.post('/logout', ctrlWrapper(logoutUserController));
router.post('/refresh', ctrlWrapper(refreshUserSessionController));

export default router;