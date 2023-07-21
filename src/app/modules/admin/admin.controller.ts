import { Request, Response } from 'express';
import { catchAsync } from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { adminFilterableFields } from './admin.constant';
import { paginationFeilds } from '../../../constant/PaginationOptions';
import { AdminService } from './admin.services';
import { IAdmin } from './admin.interface';
import { sendResponse } from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
   const filters = pick(req.query, adminFilterableFields);
   const paginationOptions = pick(req.query, paginationFeilds);

   const result = await AdminService.getAllAdmins(filters, paginationOptions);

   sendResponse<IAdmin[]>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Admins retrieved successfully !',
      meta: result.meta,
      data: result.data,
   });
});

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
   const id = req.params.id;
   const result = await AdminService.getSingleAdmin(id);

   sendResponse<IAdmin>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Admin retrieved successfully !',
      data: result,
   });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
   const id = req.params.id;
   const updatedData = req.body;

   const result = await AdminService.updateAdmin(id, updatedData);

   sendResponse<IAdmin>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Admin updated successfully !',
      data: result,
   });
});
const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
   const id = req.params.id;

   const result = await AdminService.deleteAdmin(id);

   sendResponse<IAdmin>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Admin deleted successfully !',
      data: result,
   });
});

export const AdminController = {
   getAllAdmins,
   getSingleAdmin,
   updateAdmin,
   deleteAdmin,
};
