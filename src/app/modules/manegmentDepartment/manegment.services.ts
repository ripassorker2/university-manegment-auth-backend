import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationCalculate';
import { IPaginationOptions } from '../../../interface/IPagination';
import { IGenericResposnse } from '../../../interface/common';
import { managementDepartmentSearchableFields } from './manegment.constant';
import {
   IManagementDepartment,
   IManagementDepartmentFilters,
} from './manegment.interface';
import { ManagementDepartment } from './manegment.model';

const createDepartment = async (
   payload: IManagementDepartment
): Promise<IManagementDepartment | null> => {
   const result = await ManagementDepartment.create(payload);
   return result;
};

const getAllDepartments = async (
   filters: IManagementDepartmentFilters,
   paginationOptions: IPaginationOptions
): Promise<IGenericResposnse<IManagementDepartment[]>> => {
   const { searchTerm, ...filtersData } = filters;
   const { page, limit, skip, sortBy, sortOrder } =
      paginationHelper.paginationCalculate(paginationOptions);

   const andConditions = [];

   if (searchTerm) {
      andConditions.push({
         $or: managementDepartmentSearchableFields.map(field => ({
            [field]: {
               $regex: searchTerm,
               $options: 'i',
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

   const result = await ManagementDepartment.find(whereConditions)
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);

   const total = await ManagementDepartment.countDocuments();

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
): Promise<IManagementDepartment | null> => {
   const result = await ManagementDepartment.findById(id);
   return result;
};

const updateDepartment = async (
   id: string,
   payload: Partial<IManagementDepartment>
): Promise<IManagementDepartment | null> => {
   const result = await ManagementDepartment.findOneAndUpdate(
      { _id: id },
      payload,
      {
         new: true,
      }
   );
   return result;
};

const deleteDepartment = async (
   id: string
): Promise<IManagementDepartment | null> => {
   const result = await ManagementDepartment.findByIdAndDelete(id);
   return result;
};

export const ManagementDepartmentService = {
   createDepartment,
   getAllDepartments,
   getSingleDepartment,
   updateDepartment,
   deleteDepartment,
};
