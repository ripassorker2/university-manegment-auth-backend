import { Model, Types } from 'mongoose';
import { IStudent } from '../students/student.interface';
import { IFaculty } from '../faculty/faculty.interface';
import { IAdmin } from '../admin/admin.interface';

export type IUser = {
   id: string;
   role: string;
   password: string;
   needPasswordChange: boolean;
   student?: Types.ObjectId | IStudent;
   faculty?: Types.ObjectId | IFaculty;
   admin?: Types.ObjectId | IAdmin;
};

// export type IUserMethods = {
//    isUserExist(id: string): Promise<Partial<IUser | null>>;
//    isPasswordMatched(
//       givenPassword: string,
//       savedPasword: string
//    ): Promise<boolean>;
// };

export type UserModel = {
   isUserExist(
      id: string
   ): Promise<Pick<
      IUser,
      'id' | 'password' | 'role' | 'needPasswordChange'
   > | null>;
   isPasswordMatched(
      givenPassword: string,
      savedPasword: string
   ): Promise<boolean>;
} & Model<IUser>;

// export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
