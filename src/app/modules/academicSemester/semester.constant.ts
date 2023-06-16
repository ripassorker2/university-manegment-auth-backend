import {
  IAcadememcCode,
  IAcadememcTitle,
  IAcademicSemesterMonth,
} from './semester.interface'

export const academicSemesterMonth: IAcademicSemesterMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const academmicSemesterTitle: IAcadememcTitle[] = [
  'Autumn',
  'Summer',
  'Fall',
]
export const academmicSemesterCode: IAcadememcCode[] = ['01', '02', '03']

export const academmicSemesterTitleCodeMapper: { [key: string]: string } = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
}
