import { HttpHandler, IHttpContext } from 'src/api';
import { StatusCode } from 'src/core';

// high-order HttpHandler general for other specific status code setters
export const setStatus: (status: StatusCode) => HttpHandler = (
  status: StatusCode,
) => (context: IHttpContext) => {
  context.response.status(status);
};

// 2XX
export const success: HttpHandler = setStatus(StatusCode.SUCCESS);
export const created: HttpHandler = setStatus(StatusCode.CREATED);
export const accepted: HttpHandler = setStatus(StatusCode.ACCEPTED);

// 4XX
export const badRequest: HttpHandler = setStatus(StatusCode.BAD_REQUEST);
export const unauthorized: HttpHandler = setStatus(StatusCode.UNAUTHORIZED);
export const forbidden: HttpHandler = setStatus(StatusCode.FORBIDDEN);
export const notFount: HttpHandler = setStatus(StatusCode.NOT_FOUND);
export const notAllowed: HttpHandler = setStatus(StatusCode.METHOD_NOT_ALLOWED);

// 5XX
export const internalServerError: HttpHandler = setStatus(
  StatusCode.INTERNAL_SERVER_ERROR,
);
export const notImplemented: HttpHandler = setStatus(
  StatusCode.NOT_IMPLEMENTED,
);
