var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios from 'axios';
import { HttpMethod, StatusCode } from 'core';
import { Exception } from 'exception';
import { injectLogService } from 'log';
export class HttpClient {
    constructor() {
        this.config = {};
    }
    request(url, method, data = {}, headers = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const log = injectLogService();
            try {
                log.debug('Calling request', `${this.config.base}${url}`, method, data, headers);
                const response = yield Axios.request({
                    url: `${this.config.base}${url}`,
                    method: method,
                    data: data,
                    headers: Object.assign(Object.assign({}, this.config.defaultHeaders), headers),
                });
                log.debug('Response:', response);
                if (response.status !== StatusCode.SUCCESS)
                    throw Exception.internal()
                        .withMessage(`Failed to make HTTP call ${this.config.base}${url}`)
                        .withStatusCode(StatusCode.INTERNAL_SERVER_ERROR)
                        .from('HttpClient')
                        .withMeta(response);
                return response.data;
            }
            catch (e) {
                let exception;
                if (!(e instanceof Exception))
                    exception = Exception.internal()
                        .withMessage(`Failed to make HTTP call ${this.config.base}${url}`)
                        .withStatusCode(StatusCode.INTERNAL_SERVER_ERROR)
                        .from('HttpClient')
                        .withMeta(e);
                else
                    exception = e;
                throw exception;
            }
        });
    }
    get(url, data = {}, headers = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request(url, HttpMethod.GET, data, headers);
        });
    }
    post(url, data = {}, headers = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request(url, HttpMethod.POST, data, headers);
        });
    }
    put(url, data = {}, headers = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request(url, HttpMethod.PUT, data, headers);
        });
    }
    delete(url, data = {}, headers = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request(url, HttpMethod.DELETE, data, headers);
        });
    }
}
