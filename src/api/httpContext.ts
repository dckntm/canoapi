import { Request, Response } from 'express';

export interface IHttpContext<TMeta = any> {
  request: Request;
  response: Response;
  finished: boolean;
  meta: TMeta;
}

// this is default example HttpContext
// I recommend overriding via extending
// your domain-specific HttpContext
export class HttpContext<TMeta = any> implements IHttpContext<TMeta> {
  public finished = false;
  public meta: TMeta;

  constructor(public request: Request, public response: Response, meta?: any) {
    this.meta = meta;
  }
}
