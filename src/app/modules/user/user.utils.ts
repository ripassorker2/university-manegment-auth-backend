import { IAcademicSemester } from '../academicSemester/semester.interface';
import { User } from './user.model';

export const findLastStudentId = async (): Promise<string | undefined> => {
   const lastStudentId = await User.findOne(
      { role: 'student' },
      { id: 1, _id: 0 }
   )
      .sort({
         createdAt: -1,
      })
      .lean();
   return lastStudentId?.id ? lastStudentId.id.substring(4) : undefined;
};

export const generateStudentId = async (
   academicSemester: IAcademicSemester | null
) => {
   const currentId =
      (await findLastStudentId()) || (0).toString().padStart(5, '0'); //00000
   //increment by 1
   let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
   if (academicSemester) {
      incrementedId = `${academicSemester.year.substring(2)}${
         academicSemester.code
      }${incrementedId}`;
   }

   return incrementedId;
};

export const findLastFacutlyId = async (): Promise<string | undefined> => {
   const lastFacultyId = await User.findOne(
      { role: 'faculty' },
      { id: 1, _id: 0 }
   )
      .sort({
         createdAt: -1,
      })
      .lean();
   return lastFacultyId?.id ? lastFacultyId.id.substring(1) : undefined;
};

export const generateFacultyId = async () => {
   const currentId =
      (await findLastFacutlyId()) || (0).toString().padStart(5, '0'); //00000
   //increment by 1
   let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
   incrementedId = `F${incrementedId}`;
   return incrementedId;
};

// export const findLastAdminId = async (): Promise<string | undefined> => {
//    const lastAdminId = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
//       .sort({
//          createdAt: -1,
//       })
//       .lean();
//    return lastAdminId?.id ? lastAdminId.id.substring(1) : undefined;
// };

// export const generateAdminId = async () => {
//    const currentId =
//       (await findLastStudentId()) || (0).toString().padStart(5, '0'); //00000
//    //increment by 1
//    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
//    incrementedId = `A${incrementedId}`;
//    return incrementedId;
// };
