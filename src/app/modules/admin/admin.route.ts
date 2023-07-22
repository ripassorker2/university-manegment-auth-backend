import express from 'express';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.valitation';
import { validateRequest } from '../../middleware/validateRequest';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.get(
   '/:id',
   auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
   AdminController.getSingleAdmin
);
router.get(
   '/',
   auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
   AdminController.getAllAdmins
);

router.delete(
   '/:id',
   auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
   AdminController.deleteAdmin
);

router.patch(
   '/:id',
   validateRequest(AdminValidation.updateAdmin),
   auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
   AdminController.updateAdmin
);

export const AdminRoutes = router;
