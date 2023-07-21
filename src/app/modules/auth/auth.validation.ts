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

export const AuthValidation = {
   createLoginZodSchema,
   createRefreshTokenZodSchema,
};
