import { HttpMethod } from 'core';
import { Router } from 'express';
import { HttpHandler } from './httpHandler';
interface IRoute {
    path: string;
    method: HttpMethod;
    handler: HttpHandler;
}
export declare class ApiRouter {
    private base;
    private defaultHandlers;
    private routes;
    constructor(base: string, defaultHandlers?: HttpHandler[], routes?: IRoute[]);
    apply(): Router;
    get(path: string, handler: HttpHandler): this;
    post(path: string, handler: HttpHandler): this;
    put(path: string, handler: HttpHandler): this;
    delete(path: string, handler: HttpHandler): this;
}
export {};
