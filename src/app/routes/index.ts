import express from 'express';
import { AcademicSemesterRoutes } from '../modules/academicSemester/semester.route';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/department/department.route';
import { StudentsRoutes } from '../modules/students/student.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';

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
      path: '/academicFaculty',
      route: AcademicFacultyRoutes,
   },
   {
      path: '/department',
      route: AcademicDepartmentRoutes,
   },
   {
      path: '/student',
      route: StudentsRoutes,
   },
   {
      path: '/faculty',
      route: FacultyRoutes,
   },
];

routes.forEach(route => router.use(route.path, route.route));

export default router;
