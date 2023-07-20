import { Request, Response } from 'express';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import pick from '../../../shared/pick';
import { paginationFeilds } from '../../../constant/PaginationOptions';
import { IStudent } from './student.interface';
import { studentFilterableFields } from './student.constant';
import { StudentServices } from './student.servies';

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
   const filters = pick(req.query, studentFilterableFields);
   const paginationOptions = pick(req.query, paginationFeilds);

   const result = await StudentServices.getAllStudents(
      filters,
      paginationOptions
   );

   sendResponse<IStudent[]>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Students fetched successfully',
      meta: result.meta,
      data: result.data,
   });
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
   const { id } = req.params;
   const result = await StudentServices.getSingleStudent(id);

   sendResponse<IStudent>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Student fetched successfully',
      data: result,
   });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
   const { id } = req.params;
   const result = await StudentServices.updateStudent(id, req.body);

   sendResponse<IStudent>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Student updated successfully',
      data: result,
   });
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
   const { id } = req.params;
   const result = await StudentServices.deleteStudent(id);

   sendResponse<IStudent>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Student deleted successfully',
      data: result,
   });
});

export const StudentController = {
   getAllStudents,
   getSingleStudent,
   updateStudent,
   deleteStudent,
};
