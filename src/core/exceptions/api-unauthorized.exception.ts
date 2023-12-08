import * as HttpStatus from "http-status";

import { ErrorCodes } from "../constants/error-codes.constant";
import { ApiHttpException } from "./api-http.exception";

export class ApiUnauthorizedException extends ApiHttpException {
  constructor(
    code: string = ErrorCodes.UNAUTHORIZED,
    message = "Unauthorized"
  ) {
    super(message, HttpStatus.UNAUTHORIZED);
    this.code = code;
  }
}
