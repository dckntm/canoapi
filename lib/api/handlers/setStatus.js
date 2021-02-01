import { StatusCode } from 'core';
// high-order HttpHandler general for other specific status code setters
export const setStatus = (status) => (context) => {
    context.response.status(status);
};
// 2XX
export const success = setStatus(StatusCode.SUCCESS);
export const created = setStatus(StatusCode.CREATED);
export const accepted = setStatus(StatusCode.ACCEPTED);
// 4XX
export const badRequest = setStatus(StatusCode.BAD_REQUEST);
export const unauthorized = setStatus(StatusCode.UNAUTHORIZED);
export const forbidden = setStatus(StatusCode.FORBIDDEN);
export const notFount = setStatus(StatusCode.NOT_FOUND);
export const notAllowed = setStatus(StatusCode.METHOD_NOT_ALLOWED);
// 5XX
export const internalServerError = setStatus(StatusCode.INTERNAL_SERVER_ERROR);
export const notImplemented = setStatus(StatusCode.NOT_IMPLEMENTED);
