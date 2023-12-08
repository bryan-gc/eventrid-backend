import * as HttpStatus from "http-status";

import { ErrorCodes } from "../constants/error-codes.constant";
import { ApiHttpException } from "./api-http.exception";

export class ApiForbiddenException extends ApiHttpException {
  constructor(code: string = ErrorCodes.FORBIDDEN, message = "Forbidden") {
    super(message, HttpStatus.FORBIDDEN);
    this.code = code;
  }
}
