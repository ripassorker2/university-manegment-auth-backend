import express from 'express'
import { createUser } from './user.controler'

const router = express.Router()

router.post('/create-user', createUser)

export default router