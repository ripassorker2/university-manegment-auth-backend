import { Schema, model } from 'mongoose';
import {
   AcademicFacaultyModel,
   IAcademicFaculty,
} from './academicFaculty.interface';

const academicFacultySchema = new Schema<IAcademicFaculty>(
   {
      title: {
         type: String,
      },
   },
   {
      timestamps: true,
      toJSON: {
         virtuals: true,
      },
   }
);

export const AcademicFaculty = model<IAcademicFaculty, AcademicFacaultyModel>(
   'AcademicFaculty',
   academicFacultySchema
);
