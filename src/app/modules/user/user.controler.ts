import { Request, Response } from 'express'
import { createUserDB } from './users.sercices'

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body
    const result = await createUserDB(user)
    res.status(200).json({
      status: true,
      message: 'Create user succesfully...',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      status: false,
      message: 'Faild to create user...',
      error,
    })
  }
}
