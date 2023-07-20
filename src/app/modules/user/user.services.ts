import mongoose from 'mongoose';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { AcademicSemester } from '../academicSemester/semester.model';
import { IStudent } from '../students/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import { Student } from '../students/student.model';
import { StatusCodes } from 'http-status-codes';
import { IAcademicSemester } from '../academicSemester/semester.interface';

const createStudent = async (
   student: IStudent,
   user: IUser
): Promise<IUser | null> => {
   // create default password
   if (!user.password) {
      user.password = config.default_student_password as string;
   }

   // set role
   user.role = 'student';

   const academicSemester = await AcademicSemester.findById(
      student.academicSemester
   ).lean();

   let newUserAllData = null;

   const session = await mongoose.startSession();

   try {
      session.startTransaction();

      const id = await generateStudentId(academicSemester as IAcademicSemester);
      user.id = id;
      student.id = id;

      const newStudent = await Student.create([student], { session });

      if (!newStudent.length) {
         throw new ApiError(
            StatusCodes.BAD_REQUEST,
            'Faild to create student.'
         );
      }

      user.student = newStudent[0]._id;

      const newUser = await User.create([user], { session });

      if (!newUser.length) {
         throw new ApiError(StatusCodes.BAD_REQUEST, 'Faild to create user.');
      }

      newUserAllData = newUser[0];

      await session.commitTransaction();
      await session.endSession();
   } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      throw error;
   }

   if (newUserAllData) {
      newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
         path: 'student',
         populate: [
            {
               path: 'academicSemester',
            },
            {
               path: 'academicDepartment',
            },
            {
               path: 'academicFaculty',
            },
         ],
      });
   }

   return newUserAllData;
};

export const UserServices = {
   createStudent,
};
