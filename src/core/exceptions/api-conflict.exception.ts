import * as HttpStatus from "http-status";

import { ErrorCodes } from "../constants/error-codes.constant";
import { ApiHttpException } from "./api-http.exception";

export class ApiConflictException extends ApiHttpException {
  constructor(code: string = ErrorCodes.CONFLICT, message = "Conflict") {
    super(message, HttpStatus.CONFLICT);
    this.code = code;
  }
}
