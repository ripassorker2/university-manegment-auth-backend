import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationCalculate';
import { IPaginationOptions } from '../../../interface/IPagination';
import { IGenericResposnse } from '../../../interface/common';
import { academicFacultySearchFields } from './academicFaculty.constant';
import {
   IAcademicFaculty,
   IAcademicFacultyFilters,
} from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createFaculty = async (
   payload: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
   const result = await AcademicFaculty.create(payload);
   return result;
};

const getAllFaculties = async (
   filters: IAcademicFacultyFilters,
   paginationOptions: IPaginationOptions
): Promise<IGenericResposnse<IAcademicFaculty[]>> => {
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
         $or: academicFacultySearchFields.map(feild => ({
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

   const whereConditions =
      andConditions.length > 0 ? { $and: andConditions } : {};

   const result = await AcademicFaculty.find(whereConditions)
      .sort(sortCondition)
      .skip(skip)
      .limit(limit);

   const total = await AcademicFaculty.countDocuments(whereConditions);

   return {
      meta: {
         page,
         limit,
         total,
      },
      data: result,
   };
};

const getSingleFaculty = async (
   id: string
): Promise<IAcademicFaculty | null> => {
   const result = await AcademicFaculty.findById(id);
   return result;
};

const updateFaculty = async (
   id: string,
   payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
   const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
      new: true,
   });
   return result;
};

const deleteFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
   const result = await AcademicFaculty.findByIdAndDelete(id);
   return result;
};

export const AcademicFacultyService = {
   createFaculty,
   getAllFaculties,
   getSingleFaculty,
   updateFaculty,
   deleteFaculty,
};
