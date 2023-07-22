import { Request, Response } from 'express';

import pick from '../../../shared/pick';

import { IFaculty } from './faculty.interface';
import { catchAsync } from '../../../shared/catchAsync';
import { facultyFilterableFields } from './faculty.constant';
import { paginationFeilds } from '../../../constant/PaginationOptions';
import { FacultyService } from './faculty.services';
import { sendResponse } from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
   const filters = pick(req.query, facultyFilterableFields);
   const paginationOptions = pick(req.query, paginationFeilds);

   const result = await FacultyService.getAllFaculties(
      filters,
      paginationOptions
   );

   sendResponse<IFaculty[]>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'faculties retrieved successfully !',
      meta: result.meta,
      data: result.data,
   });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
   const id = req.params.id;

   const result = await FacultyService.getSingleFaculty(id);

   sendResponse<IFaculty>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'faculty retrieved successfully !',
      data: result,
   });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
   const id = req.params.id;
   const updatedData = req.body;
   const result = await FacultyService.updateFaculty(id, updatedData);

   sendResponse<IFaculty>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'faculty updated successfully !',
      data: result,
   });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
   const id = req.params.id;
   const result = await FacultyService.deleteFaculty(id);

   sendResponse<IFaculty>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'faculty deleted successfully !',
      data: result,
   });
});

export const FacultyController = {
   getAllFaculties,
   getSingleFaculty,
   updateFaculty,
   deleteFaculty,
};
