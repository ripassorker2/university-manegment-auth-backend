import express from 'express';
import { SemesterValidation } from './semester.validtion';
import { validateRequest } from '../../middleware/validateRequest';
import { AcademicSemesterControler } from './semester.controler';
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
   AcademicSemesterControler.getSingleSemester
);
router.get(
   '/',
   auth(
      USER_ROLE.SUPER_ADMIN,
      USER_ROLE.ADMIN,
      USER_ROLE.FACULTY,
      USER_ROLE.STUDENT
   ),
   AcademicSemesterControler.getAllSemester
);
router.delete(
   '/:id',
   auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
   AcademicSemesterControler.deleteSemester
);
router.patch(
   '/:id',
   validateRequest(SemesterValidation.upadateSemesterZodSchema),
   auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
   AcademicSemesterControler.updateSemester
);
router.post(
   '/create-semester',
   validateRequest(SemesterValidation.createSemesterZodSchema),
   auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
   AcademicSemesterControler.createSemester
);

export const AcademicSemesterRoutes = router;
