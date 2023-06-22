import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { AcademicSemesterServices } from './semester.services';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResonse } from '../../../shared/sendResponse';
import { IAcademicSemester } from './semester.interface';
import pick from '../../../shared/pick';
import { paginationFeilds } from '../../../constant/PaginationOptions';
import { academicSemesterfiltersFeilds } from './semester.constant';

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const academicSemesterData = req.body;
  const result = await AcademicSemesterServices.createSemester(
    academicSemesterData
  );

  sendResonse<IAcademicSemester>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Aademic semester created successfully!',
    data: result,
  });
});

const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  //
  const filters = pick(req.query, academicSemesterfiltersFeilds);
  const paginationOptions = pick(req.query, paginationFeilds);

  const result = await AcademicSemesterServices.getAllSemester(
    filters,
    paginationOptions
  );

  sendResonse<IAcademicSemester[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Getting all semester successfully..!!',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicSemesterServices.getSingleSemester(id);

  sendResonse<IAcademicSemester>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Getting single  semester successfully..!!',
    data: result,
  });
});

export const AcademicSemesterControler = {
  createSemester,
  getAllSemester,
  getSingleSemester,
};
