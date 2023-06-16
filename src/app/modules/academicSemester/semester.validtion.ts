import { z } from 'zod'
import {
  academicSemesterMonth,
  academmicSemesterCode,
  academmicSemesterTitle,
} from './semester.constant'

const createSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academmicSemesterTitle] as [string, ...string[]], {
      required_error: 'title is required.',
    }),
    code: z.enum([...academmicSemesterCode] as [string, ...string[]], {
      required_error: 'semester code is required.',
    }),
    year: z.number({
      required_error: 'year is required',
    }),
    startMonth: z.enum([...academicSemesterMonth] as [string, ...string[]], {
      required_error: 'start month is required.',
    }),
    endMonth: z.enum([...academicSemesterMonth] as [string, ...string[]], {
      required_error: 'end month is required.',
    }),
  }),
})

export const SemesterValidation = {
  createSemesterZodSchema,
}
