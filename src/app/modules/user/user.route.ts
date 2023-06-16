import express from 'express'
import { UserControler } from './user.controler'
import { UserValidation } from './user.validation'
import { validateRequest } from '../../middleware/validateRequest'

const router = express.Router()

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  UserControler.createUser
)

export const UserRoutes = router
