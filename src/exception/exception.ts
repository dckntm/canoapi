import { StatusCode } from '../core';
import { ExceptionType } from './exceptionType';

export class Exception {
  private type: ExceptionType = ExceptionType.INTERNAL;
  status: StatusCode = StatusCode.BAD_REQUEST;
  private message = '';
  private sender = '';
  private meta?: any;

  public static api(): Exception {
    const error = new Exception();
    error.type = ExceptionType.API;

    return error;
  }

  public static business(): Exception {
    const error = new Exception();
    error.type = ExceptionType.BUSINESS;

    return error;
  }

  public static internal(): Exception {
    const error = new Exception();
    error.type = ExceptionType.INTERNAL;

    return error;
  }

  public withMessage(message: string): this {
    this.message = message;
    return this;
  }

  public withMeta(meta: any): this {
    this.meta = meta;
    return this;
  }

  public from(sender: any): this {
    this.sender = sender;
    return this;
  }

  public withStatusCode(code: StatusCode): this {
    this.status = code;
    return this;
  }
}
