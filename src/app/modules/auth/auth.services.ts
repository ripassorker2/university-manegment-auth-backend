/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { ILoginResponse, ILoginUser, IRefreshToken } from './auth.interface';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';

const loginUser = async (
   payload: ILoginUser
): Promise<ILoginResponse | null> => {
   const { id, password } = payload;

   const isUserExist = await User.isUserExist(id);

   if (!isUserExist) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User does not exist');
   }

   if (
      isUserExist.password &&
      !(await User.isPasswordMatched(password, isUserExist.password))
   ) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Password is incorrect');
   }
   // create access token
   const accessToken = jwtHelpers.createToken(
      { id: isUserExist.id, role: isUserExist?.role },
      config.jwt_secret_token as Secret,
      config.jwt_secret_expire as string
   );

   const refreshToken = jwtHelpers.createToken(
      { id: isUserExist.id, role: isUserExist?.role },
      config.jwt_refresh_token as Secret,
      config.jwt_refresh_expire as string
   );

   return {
      refreshToken,
      accessToken,
      needPasswordChange: isUserExist?.needPasswordChange,
   };
};

const refreshToken = async (token: string): Promise<IRefreshToken | null> => {
   let verifiedToken = null;
   try {
      verifiedToken = jwtHelpers.verifyToken(
         token,
         config.jwt_refresh_token as Secret
      );
   } catch (err) {
      throw new ApiError(StatusCodes.FORBIDDEN, 'Invalid Refresh Token');
   }

   const { id } = verifiedToken;

   // tumi delete hye gso  kintu tumar refresh token ase
   // checking deleted user's refresh token

   const isUserExist = await User.isUserExist(id);
   if (!isUserExist) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User does not exist');
   }

   //generate new token

   const newAccessToken = jwtHelpers.createToken(
      { id: isUserExist.id, role: isUserExist.role },
      config.jwt_secret_token as Secret,
      config.jwt_secret_expire as string
   );

   return {
      accessToken: newAccessToken,
   };
};

export const AuthServices = {
   loginUser,
   refreshToken,
};
