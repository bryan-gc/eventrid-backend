export class ApiHttpException extends Error {
  code?: string;
  httpStatusCode: number;

  constructor(message: string, httpStatusCode: number, code?: string) {
    super(message);
    this.code = code;
    this.httpStatusCode = httpStatusCode;

    Object.setPrototypeOf(this, ApiHttpException.prototype);
  }
}
