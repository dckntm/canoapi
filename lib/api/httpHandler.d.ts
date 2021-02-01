import { IHttpContext } from './httpContext';
export declare type HttpHandler = ((context: IHttpContext) => Promise<void> | void) | ((...args: unknown[]) => HttpHandler);
