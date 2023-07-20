import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { facultySearchableFields } from './faculty.constant';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import { Faculty } from './faculty.model';
import { IPaginationOptions } from '../../../interface/IPagination';
import { IGenericResposnse } from '../../../interface/common';
import { paginationHelper } from '../../../helpers/paginationCalculate';
import { StatusCodes } from 'http-status-codes';

const getAllFaculties = async (
   filters: IFacultyFilters,
   paginationOptions: IPaginationOptions
): Promise<IGenericResposnse<IFaculty[]>> => {
   const { searchTerm, ...filtersData } = filters;
   const { page, limit, skip, sortBy, sortOrder } =
      paginationHelper.paginationCalculate(paginationOptions);
   const andConditions = [];

   if (searchTerm) {
      andConditions.push({
         $or: facultySearchableFields.map(field => ({
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

   const result = await Faculty.find(whereConditions)
      .populate('academicDepartment')
      .populate('academicFaculty')
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);

   const total = await Faculty.countDocuments(whereConditions);

   return {
      meta: {
         page,
         limit,
         total,
      },
      data: result,
   };
};

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
   const result = await Faculty.findOne({ _id: id })
      .populate('academicDepartment')
      .populate('academicFaculty');

   return result;
};

const updateFaculty = async (
   id: string,
   payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
   const isExist = await Faculty.findOne({ _id: id });

   if (!isExist) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Faculty not found !');
   }

   const { name, ...facultyData } = payload;

   const updatedFacultyData: Partial<IFaculty> = { ...facultyData };

   if (name && Object.keys(name).length > 0) {
      Object.keys(name).forEach(key => {
         const nameKey = `name.${key}`;
         (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
      });
   }
   const result = await Faculty.findOneAndUpdate(
      { _id: id },
      updatedFacultyData,
      {
         new: true,
      }
   )
      .populate('academicDepartment')
      .populate('academicFaculty');
   console.log(result);
   return result;
};

const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
   // check if the faculty is exist
   const isExist = await Faculty.findOne({ _id: id });

   if (!isExist) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Faculty not found !');
   }
   let userId = null;
   const session = await mongoose.startSession();

   try {
      session.startTransaction();
      //delete faculty first
      const faculty = await Faculty.findOneAndDelete({ _id: id }, { session });

      if (faculty) {
         userId = faculty.id;
      }

      if (!faculty) {
         throw new ApiError(404, 'Failed to delete Faculty');
      }
      //delete user
      await User.deleteOne({ id: userId });

      session.commitTransaction();
      session.endSession();

      return faculty;
   } catch (error) {
      session.abortTransaction();
      throw error;
   }
};

export const FacultyService = {
   getAllFaculties,
   getSingleFaculty,
   updateFaculty,
   deleteFaculty,
};
