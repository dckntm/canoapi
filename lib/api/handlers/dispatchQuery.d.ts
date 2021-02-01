import { DispatchSource, HttpHandler } from 'api';
export declare const DispatchQuery: <TQuery, TResult>(handler: (query: TQuery) => Promise<TResult> | TResult, ...source: DispatchSource[]) => HttpHandler;
export declare const DispatchQueryFromBody: <TQuery, TResult>(handler: (query: TQuery) => Promise<TResult> | TResult) => HttpHandler;
export declare const DispatchQueryFromQuery: <TQuery, TResult>(handler: (query: TQuery) => Promise<TResult> | TResult) => HttpHandler;
export declare const DispatchQueryFromParams: <TQuery, TResult>(handler: (query: TQuery) => Promise<TResult> | TResult) => HttpHandler;
export declare const DispatchQueryFormValue: <TQuery, TResult>(value: TQuery, handler: (query: TQuery) => Promise<TResult> | TResult) => HttpHandler;
