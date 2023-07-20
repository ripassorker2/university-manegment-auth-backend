import { Request, Response } from 'express';
import pick from '../../../shared/pick';
import { catchAsync } from '../../../shared/catchAsync';
import { ManagementDepartmentService } from './manegment.services';
import { IManagementDepartment } from './manegment.interface';
import { StatusCodes } from 'http-status-codes';
import { sendResponse } from '../../../shared/sendResponse';
import { managementDepartmentFilterableFields } from './manegment.constant';
import { paginationFeilds } from '../../../constant/PaginationOptions';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
   const { ...departmentData } = req.body;
   const result = await ManagementDepartmentService.createDepartment(
      departmentData
   );

   sendResponse<IManagementDepartment>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Management department created successfully',
      data: result,
   });
});

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
   const filters = pick(req.query, managementDepartmentFilterableFields);
   const paginationOptions = pick(req.query, paginationFeilds);

   const result = await ManagementDepartmentService.getAllDepartments(
      filters,
      paginationOptions
   );

   sendResponse<IManagementDepartment[]>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Management departments retrieved successfully',
      meta: result.meta,
      data: result.data,
   });
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
   const { id } = req.params;
   const result = await ManagementDepartmentService.getSingleDepartment(id);

   sendResponse<IManagementDepartment>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Management department retieved successfully',
      data: result,
   });
});

const updateDepartment = catchAsync(
   catchAsync(async (req: Request, res: Response) => {
      const { id } = req.params;
      const updatedData = req.body;
      const result = await ManagementDepartmentService.updateDepartment(
         id,
         updatedData
      );

      sendResponse<IManagementDepartment>(res, {
         statusCode: StatusCodes.OK,
         success: true,
         message: 'Management department updated successfully',
         data: result,
      });
   })
);

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
   const { id } = req.params;
   const result = await ManagementDepartmentService.deleteDepartment(id);

   sendResponse<IManagementDepartment>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Management department deleted successfully',
      data: result,
   });
});

export const ManagementDepartmentController = {
   createDepartment,
   getAllDepartments,
   getSingleDepartment,
   updateDepartment,
   deleteDepartment,
};
