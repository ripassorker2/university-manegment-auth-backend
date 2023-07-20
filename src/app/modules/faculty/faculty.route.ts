import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { FacultyController } from './faculty.controler';
import { FacultyValidation } from './faculty.validation';

const router = express.Router();

router.get('/:id', FacultyController.getSingleFaculty);

router.patch(
   '/:id',
   validateRequest(FacultyValidation.updateFacultyZodSchema),
   FacultyController.updateFaculty
);

router.delete('/:id', FacultyController.deleteFaculty);
router.get('/', FacultyController.getAllFaculties);

export const FacultyRoutes = router;
