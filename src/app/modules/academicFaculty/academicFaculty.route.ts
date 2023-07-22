import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controler';
import { validateRequest } from '../../middleware/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
   '/create-faculty',
   validateRequest(AcademicFacultyValidation.createFacultyZodSchema),
   auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
   AcademicFacultyController.createFaculty
);
router.get(
   '/:id',
   auth(
      USER_ROLE.ADMIN,
      USER_ROLE.SUPER_ADMIN,
      USER_ROLE.FACULTY,
      USER_ROLE.STUDENT
   ),
   AcademicFacultyController.getSingleFaculty
);
//
router.patch(
   '/:id',
   validateRequest(AcademicFacultyValidation.updatefacultyZodSchema),
   auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
   AcademicFacultyController.updateFaculty
);

router.delete(
   '/:id',
   auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
   AcademicFacultyController.deleteFaculty
);

router.get(
   '/',
   auth(
      USER_ROLE.ADMIN,
      USER_ROLE.SUPER_ADMIN,
      USER_ROLE.FACULTY,
      USER_ROLE.STUDENT
   ),
   AcademicFacultyController.getAllFaculties
);

export const AcademicFacultyRoutes = router;
