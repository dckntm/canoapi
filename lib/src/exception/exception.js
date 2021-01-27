"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exception = void 0;
const core_1 = require("core");
const exceptionType_1 = require("./exceptionType");
class Exception {
    constructor() {
        this.type = exceptionType_1.ExceptionType.INTERNAL;
        this.status = core_1.StatusCode.BAD_REQUEST;
        this.message = '';
        this.sender = '';
    }
    static api() {
        const error = new Exception();
        error.type = exceptionType_1.ExceptionType.API;
        return error;
    }
    static business() {
        const error = new Exception();
        error.type = exceptionType_1.ExceptionType.BUSINESS;
        return error;
    }
    static internal() {
        const error = new Exception();
        error.type = exceptionType_1.ExceptionType.INTERNAL;
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
exports.Exception = Exception;
