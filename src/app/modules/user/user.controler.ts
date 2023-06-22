import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { UserServices } from './user.sercices';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { IUser } from './user.interface';

const createUser = catchAsync(async (req: Request, res: Response) => {
  //
  const user = req.body;
  const result = await UserServices.createUserDB(user);

  sendResponse<IUser>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User Created successfully..!!',
    data: result,
  });
});

export const UserControler = {
  createUser,
};
