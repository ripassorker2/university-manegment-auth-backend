import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { FacultyController } from './faculty.controler';
import { FacultyValidation } from './faculty.validation';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from '../../../enums/user';
const router = express.Router();

router.get(
   '/:id',
   auth(
      USER_ROLE.SUPER_ADMIN,
      USER_ROLE.ADMIN,
      USER_ROLE.FACULTY,
      USER_ROLE.STUDENT
   ),
   FacultyController.getSingleFaculty
);
router.get(
   '/',
   auth(
      USER_ROLE.SUPER_ADMIN,
      USER_ROLE.ADMIN,
      USER_ROLE.FACULTY,
      USER_ROLE.STUDENT
   ),
   FacultyController.getAllFaculties
);

router.patch(
   '/:id',
   validateRequest(FacultyValidation.updateFacultyZodSchema),
   auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
   FacultyController.updateFaculty
);

router.delete(
   '/:id',
   auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
   FacultyController.deleteFaculty
);

export const FacultyRoutes = router;
