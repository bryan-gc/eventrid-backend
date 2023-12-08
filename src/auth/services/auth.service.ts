import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { ProjectEnv } from "../../../env";
import { ErrorCodes } from "../../core/constants/error-codes.constant";
import { AppDataSource } from "../../core/database/data-source";
import { ApiConflictException } from "../../core/exceptions/api-conflict.exception";
import { ApiNotFoundException } from "../../core/exceptions/api-not-found.exception";
import { PartialUserJwtPayload } from "../../core/interfaces/payload.interface";
import { generateRandomString } from "../../core/utils/random.util";
import { UserRefreshToken } from "../../users/entities/user-refresh-token.entity";
import { User } from "../../users/entities/user.entity";
import { createUser } from "../../users/services/users.service";
import * as UsersService from "../../users/services/users.service";
import { AuthOutputDto } from "../dtos/auth-output.dto";
import { LoginInputDto } from "../dtos/login-input.dto";
import { RegisterInputDto } from "../dtos/register-input.dto";
import { UserOutputDto } from "../dtos/user-output.dto";
import { UserRefreshTokenOutputDto } from "../dtos/user-refresh-token-output.dto";

export async function registerUser(registerDto: RegisterInputDto) {
  const newUser = await createUser(registerDto);
  const userOutput: UserOutputDto = {
    createdAt: newUser.createdAt.toISOString(),
    firstName: newUser.firstName,
    id: newUser.id,
    lastName: newUser.lastName,
    updatedAt: newUser.updatedAt?.toISOString(),
    username: newUser.username,
  };
  return userOutput;
}

export async function login(loginDto: LoginInputDto) {
  const user = await UsersService.findUserByUsername(loginDto.username);

  if (!user) throw new ApiNotFoundException(ErrorCodes.USER_NOT_FOUND);

  const match = await compare(loginDto.password, user.password);
  if (!match) throw new ApiConflictException(ErrorCodes.INVALID_PASSWORD);

  const refreshToken = generateRandomString();
  const userRefreshToken = UsersService.createUserRefreshTokenInMemory(
    user,
    refreshToken
  );
  await AppDataSource.manager.save(userRefreshToken);

  const expiresIn = ProjectEnv.JWT_EXPIRATION_TIME;
  const accessToken = sign(createJwtPayload(user), ProjectEnv.JWT_SECRET_KEY, {
    expiresIn,
  });

  const authDto: AuthOutputDto = {
    accessToken,
    refreshToken,
    expiresIn,
  };

  return authDto;
}

export async function refreshAccesstoken(refreshToken: string) {
  const user = await UsersService.findUserByRefreshToken(refreshToken);

  if (!user) throw new ApiNotFoundException(ErrorCodes.USER_NOT_FOUND);

  const expiresIn = ProjectEnv.JWT_EXPIRATION_TIME;
  const accessToken = sign(createJwtPayload(user), ProjectEnv.JWT_SECRET_KEY, {
    expiresIn,
  });

  const authDto: AuthOutputDto = {
    accessToken,
    refreshToken,
    expiresIn,
  };

  return authDto;
}

function createJwtPayload(user: User) {
  const jwtPayload: PartialUserJwtPayload = {
    uid: user.id,
  };
  return jwtPayload;
}

export async function logout(refreshToken: string) {
  const userRefreshToken = await UsersService.findUserRefreshToken(
    refreshToken
  );
  if (!userRefreshToken)
    throw new ApiNotFoundException(ErrorCodes.SESSION_NOT_FOUND);

  userRefreshToken.deletedAt = new Date();

  await AppDataSource.manager.save(userRefreshToken);

  const userRefreshTokenOutputDto: UserRefreshTokenOutputDto = {
    createdAt: userRefreshToken.createdAt.toISOString(),
    updatedAt: userRefreshToken.updatedAt?.toISOString(),
    deletedAt: userRefreshToken.deletedAt?.toISOString(),
    expiredAt: userRefreshToken.expiredAt?.toISOString(),
    id: userRefreshToken.id,
    isExpired: isRefreshTokenExpired(userRefreshToken),
    refreshToken: userRefreshToken.refreshToken,
  };

  return userRefreshTokenOutputDto;
}

export async function findRefreshToken(refreshToken: string) {
  const userRefreshToken = await UsersService.findUserRefreshToken(
    refreshToken
  );

  const userRefreshTokenOutputDto: UserRefreshTokenOutputDto = {
    createdAt: userRefreshToken.createdAt.toISOString(),
    updatedAt: userRefreshToken.updatedAt?.toISOString(),
    deletedAt: userRefreshToken.deletedAt?.toISOString(),
    expiredAt: userRefreshToken.expiredAt?.toISOString(),
    id: userRefreshToken.id,
    isExpired: isRefreshTokenExpired(userRefreshToken),
    refreshToken: userRefreshToken.refreshToken,
  };
  return userRefreshTokenOutputDto;
}

function isRefreshTokenExpired(userRefreshToken: UserRefreshToken) {
  if (userRefreshToken.deletedAt) return true;
  const currentDate = new Date();
  return userRefreshToken.expiredAt < currentDate;
}
