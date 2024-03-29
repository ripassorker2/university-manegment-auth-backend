import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { UserServices } from './user.services';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { IUser } from './user.interface';

const createStudent = catchAsync(async (req: Request, res: Response) => {
   //
   const { student, ...userData } = req.body;
   const result = await UserServices.createStudent(student, userData);

   sendResponse<IUser>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'User Created successfully..!!',
      data: result,
   });
});

const createFaculy = catchAsync(async (req: Request, res: Response) => {
   const { faculty, ...userData } = req.body;
   const result = await UserServices.createFaculty(faculty, userData);

   sendResponse<IUser>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'user created successfully!',
      data: result,
   });
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
   const { admin, ...userData } = req.body;
   const result = await UserServices.createAdmin(admin, userData);

   sendResponse<IUser>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Admin created successfully!',
      data: result,
   });
});

export const UserControler = {
   createStudent,
   createFaculy,
   createAdmin,
};
