import { Request, Response } from 'express';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { AuthServices } from './auth.services';
import { ILoginResponse, IRefreshToken } from './auth.interface';
import config from '../../../config';

const loginUSer = catchAsync(async (req: Request, res: Response) => {
   const { ...loginData } = req.body;

   const result = await AuthServices.loginUser(loginData);
   // const { refreshToken, ...others } = result;

   // set refresh token into cookie
   const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
   };
   res.cookie('refreshToken', result?.refreshToken, cookieOptions);

   if (result?.refreshToken) {
      delete result.refreshToken;
   }

   sendResponse<ILoginResponse>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'User logged successfully..!!',
      data: result,
   });
});
const refreshToken = catchAsync(async (req: Request, res: Response) => {
   const { refreshToken } = req.cookies;

   const result = await AuthServices.refreshToken(refreshToken);

   // set refresh token into cookie
   const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
   };
   res.cookie('refreshToken', result?.accessToken, cookieOptions);

   sendResponse<IRefreshToken>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'User logged successfully..!!',
      data: result,
   });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
   const user = req.user;
   const { ...passwordData } = req.body;

   await AuthServices.changePassword(user, passwordData);

   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Password changed successfully !',
   });
});

export const AuthController = {
   loginUSer,
   refreshToken,
   changePassword,
};
