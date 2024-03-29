/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

const userSchema = new Schema<IUser, UserModel>(
   {
      id: {
         type: String,
         required: true,
         unique: true,
      },
      role: {
         type: String,
         required: true,
      },
      password: {
         type: String,
         required: true,
         select: 0,
      },
      needPasswordChange: {
         type: Boolean,
         default: true,
      },
      passwordChangedAt: {
         type: Date,
      },
      student: {
         type: Schema.Types.ObjectId,
         ref: 'Student',
      },
      faculty: {
         type: Schema.Types.ObjectId,
         ref: 'Faculty',
      },
      admin: {
         type: Schema.Types.ObjectId,
         ref: 'Admin',
      },
   },
   {
      timestamps: true,
      toJSON: {
         virtuals: true,
      },
   }
);

// userSchema.methods.isUserExist = async function (
//    id: string
// ): Promise<Partial<IUser | null>> {
//    return await User.findOne(
//       { id },
//       { id: 1, password: 1, needPasswordChange: 1 }
//    );
// };

// userSchema.methods.isPasswordMatched = async function (
//    givenPassword: string,
//    savedPasword: string
// ): Promise<boolean> {
//    return await bcrypt.compare(givenPassword, savedPasword);
// };

userSchema.statics.isUserExist = async function (
   id: string
): Promise<Pick<
   IUser,
   'id' | 'password' | 'role' | 'needPasswordChange'
> | null> {
   return await User.findOne(
      { id },
      { id: 1, password: 1, role: 1, needPasswordChange: 1 }
   );
};

userSchema.statics.isPasswordMatched = async function (
   givenPassword: string,
   savedPassword: string
): Promise<boolean> {
   return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre('save', async function (next) {
   let user = this;
   user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds)
   );
   next();
});

export const User = model<IUser, UserModel>('User', userSchema);
