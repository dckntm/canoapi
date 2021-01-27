"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleException = void 0;
const api_1 = require("api");
const core_1 = require("core");
const exception_1 = require("exception");
const log_1 = require("log");
const handleException = (e) => (context) => __awaiter(void 0, void 0, void 0, function* () {
    const log = log_1.injectLogService();
    let exception;
    if (!(e instanceof exception_1.Exception)) {
        exception = exception_1.Exception.internal()
            .withMessage('Unhandled internal exception')
            .withStatusCode(core_1.StatusCode.INTERNAL_SERVER_ERROR)
            .withMeta(e);
    }
    else {
        exception = e;
    }
    log.error(exception);
    yield api_1.compose(api_1.setStatus(exception.status), api_1.sendJson(exception))(context);
});
exports.handleException = handleException;
