import { Model } from 'mongoose';

export type IAcademicFaculty = {
  title: string;
};

export type AcademicFacaultyModel = Model<
  IAcademicFaculty,
  Record<string, unknown>
>;

export type IAcademicFacultyFilters = {
  searchTerm?: string;
};
