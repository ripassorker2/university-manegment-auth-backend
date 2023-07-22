import { z } from 'zod';

const createLoginZodSchema = z.object({
   body: z.object({
      id: z.string(),
      password: z.string(),
   }),
});
const createRefreshTokenZodSchema = z.object({
   cookies: z.object({
      refreshToken: z.string(),
   }),
});

const changePasswordZodSchema = z.object({
   body: z.object({
      oldPassword: z.string({
         required_error: 'Old password  is required',
      }),
      newPassword: z.string({
         required_error: 'New password  is required',
      }),
   }),
});

export const AuthValidation = {
   createLoginZodSchema,
   createRefreshTokenZodSchema,
   changePasswordZodSchema,
};
