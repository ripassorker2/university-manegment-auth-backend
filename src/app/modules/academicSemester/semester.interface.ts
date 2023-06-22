import { Model } from 'mongoose';

export type IAcademicSemesterMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IAcadememcTitle = 'Autumn' | 'Summer' | 'Fall';
export type IAcadememcCode = '01' | '02' | '03';

export type IAcademicSemester = {
  title: IAcadememcTitle;
  year: string;
  code: IAcadememcCode;
  startMonth: IAcademicSemesterMonth;
  endMonth: IAcademicSemesterMonth;
};

export type AcademicSemesterModel = Model<
  IAcademicSemester,
  Record<string, unknown>
>;

export type IAcademicSemesterFilter = {
  searchTerm?: string;
};
