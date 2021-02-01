import { DispatchSource, HttpHandler } from '../';
export declare const dispatchCommand: <TCommand>(handler: (query: TCommand) => Promise<void> | void, ...source: DispatchSource[]) => HttpHandler;
export declare const dispatchCommandFromBody: <TCommand>(handler: (command: TCommand) => Promise<void> | void) => HttpHandler;
export declare const dispatchCommandFromQuery: <TCommand>(handler: (command: TCommand) => Promise<void> | void) => HttpHandler;
export declare const dispatchCommandFromParams: <TCommand>(handler: (command: TCommand) => Promise<void> | void) => HttpHandler;
export declare const dispatchCommandFormValue: <TCommand>(value: TCommand, handler: (command: TCommand) => Promise<void> | void) => HttpHandler;
