import { IHttpContext } from './httpContext';

export type HttpHandler =
  | ((context: IHttpContext) => Promise<void> | void) // pure HttpHandler
  | ((...args: unknown[]) => HttpHandler); // high-order HttpHandler
