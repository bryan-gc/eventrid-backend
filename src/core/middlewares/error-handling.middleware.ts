import { NextFunction, Request, Response } from "express";
import * as HttpStatus from "http-status";
import * as Joi from "joi";
import { EntityNotFoundError } from "typeorm";

import { ErrorCodes } from "../constants/error-codes.constant";
import { ApiHttpException } from "../exceptions/api-http.exception";
import { sendErrorResponse } from "../utils/response.util";

export const errorHandlingMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof Joi.ValidationError) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      status: "fail",
      data: err.details.map((detail) => detail.message),
    });
  } else if (err instanceof ApiHttpException) {
    sendErrorResponse(
      res,
      err.httpStatusCode,
      err.code || ErrorCodes.UNKNOWN_ERROR,
      err.message
    );
  } else if (err instanceof EntityNotFoundError) {
    sendErrorResponse(
      res,
      HttpStatus.NOT_FOUND,
      ErrorCodes.NOT_FOUND,
      "Not Found"
    );
  } else {
    console.error(err);
    sendErrorResponse(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      ErrorCodes.INTERNAL_SERVER_ERROR,
      "Internal Server Error"
    );
  }
};
