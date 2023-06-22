import ApiError from '../../../errors/ApiError';
import {
  academicSemesterSerchFeilds,
  academmicSemesterTitleCodeMapper,
} from './semester.constant';
import {
  IAcademicSemester,
  IAcademicSemesterFilter,
} from './semester.interface';
import { StatusCodes } from 'http-status-codes';

import { AcademicSemester } from './semester.model';
import { IPaginationOptions } from '../../../interface/IPagination';
import { IGenericResposnse } from '../../../interface/common';
import { paginationHelper } from '../../../helpers/paginationCalculate';
import { SortOrder } from 'mongoose';

const createSemester = async (
  data: IAcademicSemester
): Promise<IAcademicSemester | null> => {
  //
  if (academmicSemesterTitleCodeMapper[data.title] !== data.code) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid semester code..!!!');
  }
  const semester = await AcademicSemester.create(data);

  if (!semester) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Failed to create semester....!!!'
    );
  }
  return semester;
};

const getAllSemester = async (
  filters: IAcademicSemesterFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResposnse<IAcademicSemester[]>> => {
  //.............pagiantions..............
  const { limit, page, skip, orderBy, sortBy } =
    paginationHelper.paginationCalculate(paginationOptions);
  // ............sorting.................
  const sortCondition: { [key: string]: SortOrder } = {};
  if (orderBy && sortBy) {
    sortCondition[sortBy] = orderBy;
  }

  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  //.................searching ...................
  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSerchFeilds.map(feild => ({
        [feild]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  //.................filtering ...................
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // const serchOptions = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         year: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //     ],
  //   },
  // ]

  const whereConditons =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicSemester.find(whereConditons)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findOne({ _id: id });
  return result;
};

export const AcademicSemesterServices = {
  createSemester,
  getAllSemester,
  getSingleSemester,
};
