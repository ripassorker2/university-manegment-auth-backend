import { StatusCodes } from 'http-status-codes'
import { NextFunction, Request, Response } from 'express'
import { AcademicSemesterServices } from './semester.services'
import { catchAsync } from '../../../shared/catchAsync'
import { sendResonse } from '../../../shared/sendResponse'

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //
    const { ...semesterData } = req.body
    //  const semesterData  = req.body
    const result = await AcademicSemesterServices.createSemester(semesterData)

    sendResonse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Semester Created successfully..!!',
      data: result,
    })
    next()
  }
)

export const AcademicSemesterControler = {
  createSemester,
}
