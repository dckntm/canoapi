/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

export interface IHttpContext<TMeta = any> {
  request: Request;
  response: Response;
  finished: boolean;
  meta: TMeta;

  getPayload(): any | null;
  setPayload(value: any): void;
}

// this is default example HttpContext
// I recommend overriding via extending
// your domain-specific HttpContext
export class HttpContext<TMeta> implements IHttpContext<TMeta> {
  private payload: any | null;
  public finished = false;
  public meta: TMeta;

  constructor(public request: Request, public response: Response, meta: TMeta) {
    this.payload = null;
    this.meta = meta;
  }

  getPayload(): any | null {
    return this.payload;
  }
  setPayload(value: any): void {
    if (this.payload) return;

    this.payload = value;
  }
}
