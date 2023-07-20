import express from 'express';
import { ManagementDepartmentValidation } from './manegment.validation';
import { ManagementDepartmentController } from './manegment.controller';
import { validateRequest } from '../../middleware/validateRequest';

const router = express.Router();

router.post(
   '/create-department',
   validateRequest(
      ManagementDepartmentValidation.createManagementDepartmentZodSchema
   ),
   ManagementDepartmentController.createDepartment
);

router.get('/:id', ManagementDepartmentController.getSingleDepartment);

router.patch(
   '/:id',
   validateRequest(
      ManagementDepartmentValidation.updateManagementDepartmentZodSchema
   ),
   ManagementDepartmentController.updateDepartment
);

router.delete('/:id', ManagementDepartmentController.deleteDepartment);

router.get('/', ManagementDepartmentController.getAllDepartments);

export const ManagementDepartmentRoutes = router;
