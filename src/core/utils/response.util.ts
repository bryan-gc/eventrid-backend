import { Response } from "express";

export interface Meta {
  page: number;
  pageSize: number;
  totalPages: number;
  count: number;
}

export function sendSuccessResponse<T>(
  res: Response,
  data: T,
  meta?: Meta
): void {
  const output = {
    status: "success",
    data: data,
    meta: meta ? meta : undefined,
  };

  res.json(output);
}

export function sendErrorResponse(
  res: Response,
  statusCode: number,
  code: string,
  message: string
) {
  res.status(statusCode).json({
    status: "error",
    data: { code, message },
  });
}
