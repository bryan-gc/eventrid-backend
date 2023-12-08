import { Request } from "express";

import { UserJwtPayload } from "../interfaces/payload.interface";

type RequestData<Body = any, Params = any, Query = any> = {
  body?: Body;
  params?: Params;
  query?: Query;
};

export interface RequestUtil<T extends RequestData = Record<string, any>>
  extends Request {
  body: T["body"];
  params: T["params"];
  query: T["query"];
}

export interface RequestUtilWithAuth<
  T extends RequestData = Record<string, any>
> extends Request {
  body: T["body"];
  params: T["params"];
  query: T["query"];
  user: UserJwtPayload;
}

export interface BaseParams {
  id: string;
}
