import * as HttpStatus from "http-status";

import { ErrorCodes } from "../constants/error-codes.constant";
import { ApiHttpException } from "./api-http.exception";

export class ApiNotFoundException extends ApiHttpException {
  constructor(code: string = ErrorCodes.NOT_FOUND, message = "Not Found") {
    super(message, HttpStatus.NOT_FOUND);
    this.code = code;
  }
}
