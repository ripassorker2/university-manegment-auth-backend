import express from 'express'
import { SemesterValidation } from './semester.validtion'
import { validateRequest } from '../../middleware/validateRequest'
import { AcademicSemesterControler } from './semester.controler'
const router = express.Router()

router.post(
  '/create-semester',
  validateRequest(SemesterValidation.createSemesterZodSchema),
  AcademicSemesterControler.createSemester
)

export const AcademicSemesterRoutes = router