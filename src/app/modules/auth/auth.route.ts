import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
   '/login',
   validateRequest(AuthValidation.createLoginZodSchema),
   auth(
      USER_ROLE.SUPER_ADMIN,
      USER_ROLE.ADMIN,
      USER_ROLE.FACULTY,
      USER_ROLE.STUDENT
   ),
   AuthController.loginUSer
);
router.post(
   '/refresh-token',
   validateRequest(AuthValidation.createRefreshTokenZodSchema),
   auth(
      USER_ROLE.SUPER_ADMIN,
      USER_ROLE.ADMIN,
      USER_ROLE.FACULTY,
      USER_ROLE.STUDENT
   ),
   AuthController.refreshToken
);

router.post(
   '/change-password',
   validateRequest(AuthValidation.changePasswordZodSchema),
   auth(
      USER_ROLE.SUPER_ADMIN,
      USER_ROLE.ADMIN,
      USER_ROLE.FACULTY,
      USER_ROLE.STUDENT
   ),
   AuthController.changePassword
);

export const AuthRoutes = router;
