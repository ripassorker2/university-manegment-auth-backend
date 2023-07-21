import express from 'express';
import { UserControler } from './user.controler';
import { UserValidation } from './user.validation';
import { validateRequest } from '../../middleware/validateRequest';

const router = express.Router();

router.post(
   '/create-student',
   validateRequest(UserValidation.createStudentZodSchema),
   UserControler.createStudent
);

router.post(
   '/create-faculty',
   validateRequest(UserValidation.createFacultyZodSchema),
   UserControler.createFaculy
);

router.post(
   '/create-admin',
   validateRequest(UserValidation.createAdminZodSchema),
   UserControler.createAdmin
);

export const UserRoutes = router;
