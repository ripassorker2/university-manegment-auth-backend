import express from 'express';
import { StudentController } from './student.controler';
import { validateRequest } from '../../middleware/validateRequest';
import { StudentValidation } from './student.validation';

const router = express.Router();

router.get('/:id', StudentController.getSingleStudent);
router.get('/', StudentController.getAllStudents);

router.patch(
   '/:id',
   validateRequest(StudentValidation.updateStudentZodSchema),
   StudentController.updateStudent
);
router.delete('/:id', StudentController.deleteStudent);

export const StudentsRoutes = router;
