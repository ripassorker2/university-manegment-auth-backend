import ApiError from '../../../errors/ApiError'
import { academmicSemesterTitleCodeMapper } from './semester.constant'
import { IAcademicSemester } from './semester.interface'
import { StatusCodes } from 'http-status-codes'

import { AcademicSemester } from './semester.model'
const createSemester = async (
  data: IAcademicSemester
): Promise<IAcademicSemester | null> => {
  if (academmicSemesterTitleCodeMapper[data.title] !== data.code) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid semester code..!!!')
  }

  const semester = await AcademicSemester.create(data)

  if (!semester) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Failed to create semester....!!!'
    )
  }
  return semester
}

export const AcademicSemesterServices = {
  createSemester,
}
