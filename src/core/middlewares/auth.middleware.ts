import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";

import { ProjectEnv } from "../../../env";
import { ErrorCodes } from "../constants/error-codes.constant";
import { ApiUnauthorizedException } from "../exceptions/api-unauthorized.exception";
import { UserJwtPayload } from "../interfaces/payload.interface";
import { RequestUtilWithAuth } from "../types/request-custom.type";

export const verifyToken = (
  req: RequestUtilWithAuth,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) throw new ApiUnauthorizedException(ErrorCodes.JWT_REQUIRED);

  try {
    const verified = jwt.verify(
      token,
      ProjectEnv.JWT_SECRET_KEY
    ) as UserJwtPayload;
    req.user = verified;
    next();
  } catch (error) {
    throw new ApiUnauthorizedException(ErrorCodes.JWT_INVALID);
  }
};
