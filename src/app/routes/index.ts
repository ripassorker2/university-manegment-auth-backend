import express from 'express';
import { AcademicSemesterRoutes } from '../modules/academicSemester/semester.route';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicFacultyRoutes } from '../modules/faculty/faculty.route';

const router = express.Router();

const routes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/faculty',
    route: AcademicFacultyRoutes,
  },
];

routes.forEach(route => router.use(route.path, route.route));

export default router;
