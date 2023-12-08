import { hash } from "bcrypt";

import { RegisterInputDto } from "../../auth/dtos/register-input.dto";
import { ErrorCodes } from "../../core/constants/error-codes.constant";
import { HOURS_TO_EXPIRE_REFRESH_TOKEN } from "../../core/constants/general.constant";
import { AppDataSource } from "../../core/database/data-source";
import { ApiConflictException } from "../../core/exceptions/api-conflict.exception";
import { addHoursToDate } from "../../core/utils/date.util";
import { UserRefreshToken } from "../entities/user-refresh-token.entity";
import { User } from "../entities/user.entity";
import { UserOutputDto } from "../../auth/dtos/user-output.dto";

export async function findUserByUsername(username: string) {
  const user = await AppDataSource.manager.findOneBy(User, {
    username,
  });
  return user;
}

export async function findUserById(id: number) {
  const user = await AppDataSource.manager.findOneByOrFail(User, {
    id,
  });

  const userOutput: UserOutputDto = {
    createdAt: user.createdAt.toISOString(),
    firstName: user.firstName,
    id: user.id,
    lastName: user.lastName,
    updatedAt: user.updatedAt?.toISOString(),
    username: user.username,
  };
  return userOutput;
}

export async function createUser(registerDto: RegisterInputDto) {
  const userWithSameUsername = await findUserByUsername(registerDto.username);
  if (userWithSameUsername)
    throw new ApiConflictException(ErrorCodes.USER_ALREADY_TAKEN);

  const hashedPassword = await hash(registerDto.password, 10);

  const user = AppDataSource.manager.create(User, {
    username: registerDto.username,
    password: hashedPassword,
    firstName: registerDto.firstName,
    lastName: registerDto.lastName,
  });

  await AppDataSource.manager.save(user);

  return user;
}

export function createUserRefreshTokenInMemory(
  user: User,
  refreshToken: string
) {
  const userRefreshToken = AppDataSource.manager.create(UserRefreshToken, {
    user,
    refreshToken,
    expiredAt: addHoursToDate(new Date(), HOURS_TO_EXPIRE_REFRESH_TOKEN),
  });

  return userRefreshToken;
}

export async function findUserRefreshToken(refreshToken: string) {
  const userRefreshToken = await AppDataSource.manager.findOneByOrFail(
    UserRefreshToken,
    {
      refreshToken,
      deletedAt: undefined,
    }
  );
  return userRefreshToken;
}

export async function findUserByRefreshToken(refreshToken: string) {
  const userRefreshToken = await AppDataSource.manager.findOne(
    UserRefreshToken,
    {
      where: {
        refreshToken,
      },
      relations: ["user"],
    }
  );

  if (!userRefreshToken)
    throw new ApiConflictException(ErrorCodes.SESSION_NOT_FOUND);

  return userRefreshToken.user;
}
