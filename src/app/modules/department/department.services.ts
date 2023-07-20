import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationCalculate';
import { IPaginationOptions } from '../../../interface/IPagination';
import { IGenericResposnse } from '../../../interface/common';
import { academicDepartmentSearchableFields } from './department.constant';
import {
   IAcademicDepartment,
   IAcademicDepartmentFilters,
} from './department.interface';
import { AcademicDepartment } from './department.model';

const createDepartment = async (
   payload: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
   const result = (await AcademicDepartment.create(payload)).populate(
      'academicFaculty'
   );
   return result;
};

const getAllDepartments = async (
   filters: IAcademicDepartmentFilters,
   paginationOptions: IPaginationOptions
): Promise<IGenericResposnse<IAcademicDepartment[]>> => {
   const { limit, page, skip, sortBy, sortOrder } =
      paginationHelper.paginationCalculate(paginationOptions);

   const { searchTerm, ...filtersData } = filters;

   const andConditions = [];

   if (searchTerm) {
      andConditions.push({
         $or: academicDepartmentSearchableFields.map(field => ({
            [field]: {
               $regex: searchTerm,
               $paginationOptions: 'i',
            },
         })),
      });
   }

   if (Object.keys(filtersData).length) {
      andConditions.push({
         $and: Object.entries(filtersData).map(([field, value]) => ({
            [field]: value,
         })),
      });
   }

   const sortConditions: { [key: string]: SortOrder } = {};

   if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder;
   }
   const whereConditions =
      andConditions.length > 0 ? { $and: andConditions } : {};

   const result = await AcademicDepartment.find(whereConditions)
      .populate('academicFaculty')
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);

   const total = await AcademicDepartment.countDocuments(whereConditions);

   return {
      meta: {
         page,
         limit,
         total,
      },
      data: result,
   };
};

const getSingleDepartment = async (
   id: string
): Promise<IAcademicDepartment | null> => {
   const result = await AcademicDepartment.findById(id).populate(
      'academicFaculty'
   );
   return result;
};

const updateDepartment = async (
   id: string,
   payload: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null> => {
   const result = await AcademicDepartment.findOneAndUpdate(
      { _id: id },
      payload,
      {
         new: true,
      }
   ).populate('academicFaculty');
   return result;
};

const deleteDepartment = async (
   id: string
): Promise<IAcademicDepartment | null> => {
   const result = await AcademicDepartment.findByIdAndDelete(id);
   return result;
};

export const AcademicDepartmentService = {
   getAllDepartments,
   getSingleDepartment,
   updateDepartment,
   deleteDepartment,
   createDepartment,
};
