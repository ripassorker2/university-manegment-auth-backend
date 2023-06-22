import express from 'express';
import { SemesterValidation } from './semester.validtion';
import { validateRequest } from '../../middleware/validateRequest';
import { AcademicSemesterControler } from './semester.controler';
const router = express.Router();

router.get('/:id', AcademicSemesterControler.getSingleSemester);
router.delete('/:id', AcademicSemesterControler.deleteSemester);
router.patch(
  '/:id',
  validateRequest(SemesterValidation.upadateSemesterZodSchema),
  AcademicSemesterControler.updateSemester
);
router.get('/', AcademicSemesterControler.getAllSemester);
router.post(
  '/create-semester',
  validateRequest(SemesterValidation.createSemesterZodSchema),
  AcademicSemesterControler.createSemester
);

export const AcademicSemesterRoutes = router;
