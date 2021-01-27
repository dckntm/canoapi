import { Request, Response } from 'express';
export interface IHttpContext<TMeta = any> {
    request: Request;
    response: Response;
    finished: boolean;
    meta: TMeta;
    getPayload(): any | null;
    setPayload(value: any): void;
}
export declare class HttpContext<TMeta> implements IHttpContext<TMeta> {
    request: Request;
    response: Response;
    private payload;
    finished: boolean;
    meta: TMeta;
    constructor(request: Request, response: Response, meta: TMeta);
    getPayload(): any | null;
    setPayload(value: any): void;
}
