import { Model, Types } from 'mongoose';
import { IStudent } from '../students/student.interface';

export type IUser = {
   id: string;
   role: string;
   password: string;
   student?: Types.ObjectId | IStudent;
   //  faculty?: Types.ObjectId | IFacutly;
   //  admin?: Types.ObjectId | IAdmin;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
