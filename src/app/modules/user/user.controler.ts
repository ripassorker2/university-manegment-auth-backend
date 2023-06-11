import { RequestHandler } from 'express'
import { UserServices } from './user.sercices'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const user = req.body

    const result = await UserServices.createUserDB(user)
    res.status(200).json({
      status: true,
      message: 'Create user succesfully...',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const UserControler = {
  createUser,
}
