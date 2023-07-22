import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { AcademicDepartmentValidation } from './department.validaton';
import { AcademicDepartmentController } from './department.controler';
import { USER_ROLE } from '../../../enums/user';
import { auth } from '../../middleware/auth';

const router = express.Router();

router.post(
   '/create-department',
   validateRequest(
      AcademicDepartmentValidation.createAcademicDepartmentZodSchema
   ),
   auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
   AcademicDepartmentController.createDepartment
);

router.get(
   '/:id',
   auth(
      USER_ROLE.SUPER_ADMIN,
      USER_ROLE.ADMIN,
      USER_ROLE.FACULTY,
      USER_ROLE.STUDENT
   ),
   AcademicDepartmentController.getSingleDepartment
);
router.get(
   '/',
   auth(
      USER_ROLE.SUPER_ADMIN,
      USER_ROLE.ADMIN,
      USER_ROLE.FACULTY,
      USER_ROLE.STUDENT
   ),
   AcademicDepartmentController.getAllDepartments
);
router.patch(
   '/:id',
   validateRequest(
      AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
   ),
   auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
   AcademicDepartmentController.updateDepartment
);

router.delete(
   '/:id',
   auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
   AcademicDepartmentController.deleteDepartment
);

export const AcademicDepartmentRoutes = router;
