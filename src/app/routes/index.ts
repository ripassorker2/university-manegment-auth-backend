import express from 'express'
import { AcademicSemesterRoutes } from '../modules/academicSemester/semester.route'
import { UserRoutes } from '../modules/user/user.route'

const router = express.Router()

const routes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/semesters',
    route: AcademicSemesterRoutes,
  },
]

routes.forEach(route => router.use(route.path, route.route))

export default router
