"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exception = void 0;
var core_1 = require("core");
var exceptionType_1 = require("./exceptionType");
var Exception = /** @class */ (function () {
    function Exception() {
        this.type = exceptionType_1.ExceptionType.INTERNAL;
        this.status = core_1.StatusCode.BAD_REQUEST;
        this.message = '';
        this.sender = '';
    }
    Exception.api = function () {
        var error = new Exception();
        error.type = exceptionType_1.ExceptionType.API;
        return error;
    };
    Exception.business = function () {
        var error = new Exception();
        error.type = exceptionType_1.ExceptionType.BUSINESS;
        return error;
    };
    Exception.internal = function () {
        var error = new Exception();
        error.type = exceptionType_1.ExceptionType.INTERNAL;
        return error;
    };
    Exception.prototype.withMessage = function (message) {
        this.message = message;
        return this;
    };
    Exception.prototype.withMeta = function (meta) {
        this.meta = meta;
        return this;
    };
    Exception.prototype.from = function (sender) {
        this.sender = sender;
        return this;
    };
    Exception.prototype.withStatusCode = function (code) {
        this.status = code;
        return this;
    };
    return Exception;
}());
exports.Exception = Exception;
