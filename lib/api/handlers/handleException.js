var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { compose, sendJson, setStatus } from 'api';
import { StatusCode } from 'core';
import { Exception } from 'exception';
import { injectLogService } from 'log';
export const handleException = (e) => (context) => __awaiter(void 0, void 0, void 0, function* () {
    const log = injectLogService();
    let exception;
    if (!(e instanceof Exception)) {
        exception = Exception.internal()
            .withMessage('Unhandled internal exception')
            .withStatusCode(StatusCode.INTERNAL_SERVER_ERROR)
            .withMeta(e);
    }
    else {
        exception = e;
    }
    log.error(exception);
    yield compose(setStatus(exception.status), sendJson(exception))(context);
});
