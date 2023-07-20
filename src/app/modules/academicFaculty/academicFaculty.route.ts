import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controler';
import { validateRequest } from '../../middleware/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.post(
   '/create-faculty',
   validateRequest(AcademicFacultyValidation.createFacultyZodSchema),
   AcademicFacultyController.createFaculty
);
router.get('/:id', AcademicFacultyController.getSingleFaculty);
//
router.patch(
   '/:id',
   validateRequest(AcademicFacultyValidation.updatefacultyZodSchema),
   AcademicFacultyController.updateFaculty
);

router.delete('/:id', AcademicFacultyController.deleteFaculty);

router.get('/', AcademicFacultyController.getAllFaculties);

export const AcademicFacultyRoutes = router;
