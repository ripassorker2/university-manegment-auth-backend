import express from 'express';
import { StudentController } from './student.controler';
import { validateRequest } from '../../middleware/validateRequest';
import { StudentValidation } from './student.validation';
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
   StudentController.getSingleStudent
);
router.get(
   '/',
   auth(
      USER_ROLE.SUPER_ADMIN,
      USER_ROLE.ADMIN,
      USER_ROLE.FACULTY,
      USER_ROLE.STUDENT
   ),
   StudentController.getAllStudents
);

router.patch(
   '/:id',
   validateRequest(StudentValidation.updateStudentZodSchema),
   auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
   StudentController.updateStudent
);
router.delete(
   '/:id',
   auth(USER_ROLE.SUPER_ADMIN),
   StudentController.deleteStudent
);

export const StudentsRoutes = router;
