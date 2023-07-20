/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPaginationOptions } from '../../../interface/IPagination';
import { IGenericResposnse } from '../../../interface/common';
import { paginationHelper } from '../../../helpers/paginationCalculate';
import { SortOrder } from 'mongoose';
import { IStudent, IStudentFilters } from './student.interface';
import { studentSearchableFields } from './student.constant';
import { Student } from './student.model';
import ApiError from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';

const getAllStudents = async (
   filters: IStudentFilters,
   paginationOptions: IPaginationOptions
): Promise<IGenericResposnse<IStudent[]>> => {
   //
   //.............pagiantions..............
   const { limit, page, skip, sortOrder, sortBy } =
      paginationHelper.paginationCalculate(paginationOptions);

   // ............sorting.................
   const sortCondition: { [key: string]: SortOrder } = {};
   if (sortOrder && sortBy) {
      sortCondition[sortBy] = sortOrder;
   }

   const { searchTerm, ...filtersData } = filters;

   const andConditions = [];
   //.................searching ...................
   if (searchTerm) {
      andConditions.push({
         $or: studentSearchableFields.map(feild => ({
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

   const whereConditons =
      andConditions.length > 0 ? { $and: andConditions } : {};

   const result = await Student.find(whereConditons)
      .populate('academicSemester')
      .populate('academicDepartment')
      .populate('academicFaculty')
      .sort(sortCondition)
      .skip(skip)
      .limit(limit);
   const total = await Student.countDocuments(whereConditons);

   return {
      meta: {
         page,
         limit,
         total,
      },
      data: result,
   };
};

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
   const result = await Student.findOne({ _id: id })
      .populate('academicSemester')
      .populate('academicDepartment')
      .populate('academicFaculty');
   return result;
};

const updateStudent = async (
   id: string,
   payload: Partial<IStudent>
): Promise<IStudent | null> => {
   const isExist = await Student.findOne({ id });
   if (!isExist) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Cannot found the student.');
   }

   const { name, guardian, localGuardian, ...studentData } = payload;

   const updateStudentData = { ...studentData };

   if (name && Object.keys(name).length > 0) {
      Object.keys(name).forEach(key => {
         const nameKey = `name.${key}`;
         (updateStudentData as any)[nameKey] = name[key as keyof typeof name];
      });
   }
   if (guardian && Object.keys(guardian).length > 0) {
      Object.keys(guardian).forEach(key => {
         const guardianKey = `guardian.${key}`;
         (updateStudentData as any)[guardianKey] =
            guardian[key as keyof typeof guardian];
      });
   }
   if (localGuardian && Object.keys(localGuardian).length > 0) {
      Object.keys(localGuardian).forEach(key => {
         const localGuardianKey = `localGuardian.${key}`;
         (updateStudentData as any)[localGuardianKey] =
            localGuardian[key as keyof typeof localGuardian];
      });
   }

   const result = await Student.findOneAndUpdate({ id }, updateStudentData, {
      new: true,
   })
      .populate('academicSemester')
      .populate('academicDepartment')
      .populate('academicFaculty');
   return result;
};

const deleteStudent = async (id: string): Promise<IStudent | null> => {
   const result = await Student.findByIdAndDelete({ _id: id })
      .populate('academicSemester')
      .populate('academicDepartment')
      .populate('academicFaculty');
   return result;
};

export const StudentServices = {
   getAllStudents,
   getSingleStudent,
   updateStudent,
   deleteStudent,
};
