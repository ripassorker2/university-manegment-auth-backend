import express from 'express';
import { ManagementDepartmentValidation } from './manegment.validation';
import { ManagementDepartmentController } from './manegment.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { USER_ROLE } from '../../../enums/user';
import { auth } from '../../middleware/auth';

const router = express.Router();

router.post(
   '/create-department',
   validateRequest(
      ManagementDepartmentValidation.createManagementDepartmentZodSchema
   ),
   auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
   ManagementDepartmentController.createDepartment
);

router.get(
   '/:id',
   auth(
      USER_ROLE.SUPER_ADMIN,
      USER_ROLE.ADMIN,
      USER_ROLE.FACULTY,
      USER_ROLE.STUDENT
   ),
   ManagementDepartmentController.getSingleDepartment
);
router.get(
   '/',
   auth(
      USER_ROLE.SUPER_ADMIN,
      USER_ROLE.ADMIN,
      USER_ROLE.FACULTY,
      USER_ROLE.STUDENT
   ),
   ManagementDepartmentController.getAllDepartments
);

router.patch(
   '/:id',
   validateRequest(
      ManagementDepartmentValidation.updateManagementDepartmentZodSchema
   ),
   auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
   ManagementDepartmentController.updateDepartment
);

router.delete(
   '/:id',
   auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
   ManagementDepartmentController.deleteDepartment
);

export const ManagementDepartmentRoutes = router;
