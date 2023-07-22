import express from 'express';
import { UserControler } from './user.controler';
import { UserValidation } from './user.validation';
import { validateRequest } from '../../middleware/validateRequest';
import { USER_ROLE } from '../../../enums/user';
import { auth } from '../../middleware/auth';

const router = express.Router();

router.post(
   '/create-student',
   validateRequest(UserValidation.createStudentZodSchema),
   auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
   UserControler.createStudent
);

router.post(
   '/create-faculty',
   validateRequest(UserValidation.createFacultyZodSchema),
   auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
   UserControler.createFaculy
);

router.post(
   '/create-admin',
   validateRequest(UserValidation.createAdminZodSchema),
   auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
   UserControler.createAdmin
);

export const UserRoutes = router;
