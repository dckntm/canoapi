import { StatusCode } from 'core';
import { ExceptionType } from './exceptionType';
export class Exception {
    constructor() {
        this.type = ExceptionType.INTERNAL;
        this.status = StatusCode.BAD_REQUEST;
        this.message = '';
        this.sender = '';
    }
    static api() {
        const error = new Exception();
        error.type = ExceptionType.API;
        return error;
    }
    static business() {
        const error = new Exception();
        error.type = ExceptionType.BUSINESS;
        return error;
    }
    static internal() {
        const error = new Exception();
        error.type = ExceptionType.INTERNAL;
        return error;
    }
    withMessage(message) {
        this.message = message;
        return this;
    }
    withMeta(meta) {
        this.meta = meta;
        return this;
    }
    from(sender) {
        this.sender = sender;
        return this;
    }
    withStatusCode(code) {
        this.status = code;
        return this;
    }
}
