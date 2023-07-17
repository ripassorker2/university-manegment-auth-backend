import { Schema, model } from 'mongoose';
import { AcademicSemesterModel, IAcademicSemester } from './semester.interface';
import {
  academicSemesterMonth,
  academmicSemesterCode,
  academmicSemesterTitle,
} from './semester.constant';
import ApiError from '../../../errors/ApiError';

import { StatusCodes } from 'http-status-codes';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      enum: academmicSemesterTitle,
      required: true,
    },
    code: {
      type: String,
      enum: academmicSemesterCode,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: academicSemesterMonth,
      required: true,
    },
    endMonth: {
      type: String,
      enum: academicSemesterMonth,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });

  if (isExist) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      'Academic semester is already exist !'
    );
  }
  next();
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
