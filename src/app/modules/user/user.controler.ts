import { StatusCodes } from 'http-status-codes'
import { NextFunction, Request, Response } from 'express'
import { UserServices } from './user.sercices'
import { catchAsync } from '../../../shared/catchAsync'
import { sendResonse } from '../../../shared/sendResponse'

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //
    const user = req.body
    const result = await UserServices.createUserDB(user)

    sendResonse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'User Created successfully..!!',
      data: result,
    })
    next()
  }
)

export const UserControler = {
  createUser,
}
